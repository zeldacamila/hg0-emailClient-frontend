import { FC } from 'react';
import { useMailsByRecipientQuery } from '../../features/mail/mailAPI';
import { useAppSelector } from '../../hooks';
import { Avatar, Button, Empty, List, Row, Space } from 'antd';
import {
  EyeFilled,
  ReloadOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Mail } from '../../types/mail';
import dayjs from 'dayjs';

const { Item } = List;

type MailInboxListProps = {
  onClickDetail: (id: number, from: 'sent' | 'inbox') => void;
};
const MailInboxList: FC<MailInboxListProps> = ({ onClickDetail }) => {
  const user = useAppSelector((state) => state.user.value);
  const { data, isLoading, refetch } = useMailsByRecipientQuery(
    user?.email || '',
    {
      refetchOnMountOrArgChange: true,
    },
  );
  return (
    <List<Mail>
      header={
        <Row justify="space-between">
          <Space size={10}>
            <h3>Inbox</h3>
            <SendOutlined />
          </Space>
          <Button
            size="small"
            onClick={refetch}
            icon={<ReloadOutlined size={12} />}
            children="Refresh"
          />
        </Row>
      }
      dataSource={data?.data}
      loading={isLoading}
      locale={{ emptyText: <Empty description="No mails" /> }}
      renderItem={({ id, status, subject, sender, timestamp }) => (
        <Item
          style={{
            cursor: 'pointer',
            backgroundColor: status ? '#f0f2f3' : 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
          onClick={() => onClickDetail(id, 'inbox')}
        >
          <Item.Meta
            avatar={
              <Avatar
                style={{ backgroundColor: status ? 'green' : 'gray' }}
                icon={<UserOutlined />}
              />
            }
            title={subject}
            description={
              <Space size={15}>
                {sender.email}
                {dayjs(timestamp).format('DD-MM-YY')}
              </Space>
            }
          />
          <Button
            icon={<EyeFilled />}
            type="dashed"
            onClick={() => onClickDetail(id, 'inbox')}
          >
            See
          </Button>
        </Item>
      )}
    />
  );
};

export default MailInboxList;
