import {FC } from 'react';
import { useMailsByRecipientQuery } from '../../features/mail/mailAPI';
import { useAppSelector } from '../../hooks';
import { Avatar, Button, Empty, List, Space } from 'antd';
import { EyeFilled, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Mail } from '../../types/mail';
import dayjs from 'dayjs';

const { Item } = List;

type MailInboxListProps = {
    onClickDetail: (id: number) => void;
}
const MailInboxList: FC<MailInboxListProps> = ({
    onClickDetail
}) => {
    const user = useAppSelector((state) => state.user.value);
    const { data, isLoading } = useMailsByRecipientQuery(user?.email || '');
    return (
        <List<Mail> 
            header={(
                <Space>
                    <h3>Inbox</h3>
                    <SendOutlined />
                </Space>
            )}
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
                        onClick={() => onClickDetail(item.id)}
                    >
                        Read
                    </Button>
                </Item>
            )}
        />
    );
};

export default MailInboxList;