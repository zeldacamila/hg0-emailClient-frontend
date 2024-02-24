import {Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useMailsBySenderQuery } from '../../features/mail/mailAPI';
import { useAppSelector } from '../../hooks';
import { Avatar, Button, Empty, List, Space } from 'antd';
import { EyeFilled, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Mail } from '../../types/mail';
import dayjs from 'dayjs';

const { Item } = List;

type MailSentListProps = {
    onClickDetail: (id: number) => void;
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
            renderItem={(item) => (
                <Item>
                    <Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#87d069' }} icon={<UserOutlined />} />}
                        title={item.subject}
                        description={
                            <Space size={15}>
                                {item.sender.email}
                                {dayjs(item.timestamp).format('DD-MM-YY')}
                            </ Space>
                        }
                        children='skdjsajkhd'
                    />
                    <Button 
                        icon={<EyeFilled />} 
                        type='dashed'
                        onClick={() =>{console.log(item) 
                            onClickDetail(item.id)}}
                    >
                        Read
                    </Button>
                </Item>
            )}
        />
    );
};

export default MailSentList;