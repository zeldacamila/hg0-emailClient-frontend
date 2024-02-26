import {Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useMailsBySenderQuery } from '../../features/mail/mailAPI';
import { useAppSelector } from '../../hooks';
import { Avatar, Button, Empty, List, Space } from 'antd';
import { EyeFilled, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Mail } from '../../types/mail';
import dayjs from 'dayjs';

const { Item } = List;

type MailSentListProps = {
    onClickDetail: (id: number, from: 'sent' | 'inbox') => void;
    isRefetch: boolean;
    setIsRefetch: Dispatch<SetStateAction<boolean>>;
}
const MailSentList: FC<MailSentListProps> = ({
    onClickDetail,
    isRefetch,
    setIsRefetch,
}) => {
    const user = useAppSelector((state) => state.user.value);
    const { data, isLoading, refetch } = useMailsBySenderQuery(user?.email || '',{
        refetchOnMountOrArgChange: true,
    });
    useEffect(() => {
        if(isRefetch){
            refetch()
            setIsRefetch(false)
        }
    }, [isRefetch, setIsRefetch])

    return (
        <List<Mail> 
            header={(
                <Space>
                    <h3>Sent</h3>
                    <SendOutlined />
                </Space>
            )}
            style={{overflow: 'auto', height: '100%'}}
            dataSource={data?.data}
            loading={isLoading}
            locale={{emptyText: <Empty description="No mails" />}}
            renderItem={({ id, subject, sender, timestamp }) => (
                <Item
                    style={{
                        cursor: 'pointer',
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                    }}
                    onClick={() => onClickDetail(id, 'sent')}
                >
                    <Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#87d069' }} icon={<UserOutlined />} />}
                        title={subject}
                        description={
                            <Space size={15}>
                                {sender.email}
                                {dayjs(timestamp).format('DD-MM-YY')}
                            </ Space>
                        }
                    />
                    <Button 
                        icon={<EyeFilled />} 
                        type='dashed'
                        onClick={() => onClickDetail(id, 'sent')}
                    >
                        See
                    </Button>
                </Item>
            )}
        />
    );
};

export default MailSentList;