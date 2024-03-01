import { FC } from 'react';
import { useMailsByRecipientQuery } from '../../features/mail/mailAPI';
import { useAppSelector } from '../../hooks';
import { Button, Empty, List, Row, Space } from 'antd';
import {
  ReloadOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Mail } from '../../types/mail';
import MailItem from './MailItem';


/**
 * `MailInboxList` displays a list of emails received by the current user. It fetches the mail data
 * using the `useMailsByRecipientQuery` hook based on the user's email and provides a refresh functionality
 * to update the list. Each mail item can be clicked to view its details, handled by the `onClickDetail` callback.
 *
 * This component uses Ant Design's `List`, `Avatar`, `Button`, `Row`, and `Space` components to render
 * the inbox list in a user-friendly manner. It shows a "Refresh" button to allow users to manually update
 * the list of emails. Unread emails are highlighted, and the list displays a message when no mails are available.
 *
 */
const MailInboxList: FC = () => {
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
      style={{ overflow: 'auto', height: '100%' }}
      dataSource={data?.data}
      loading={isLoading}
      locale={{ emptyText: <Empty description="No mails" /> }}
      renderItem={(mail) => (
        <MailItem
          mail={mail}
          refetch={refetch}
          folder="inbox"
        />
      )}
    />
  );
};

export default MailInboxList;
