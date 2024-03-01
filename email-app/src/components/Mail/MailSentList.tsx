import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useMailsBySenderQuery } from '../../features/mail/mailAPI';
import { useAppSelector } from '../../hooks';
import { Empty, List, Space } from 'antd';
import {  SendOutlined } from '@ant-design/icons';
import { Mail } from '../../types/mail';
import MailItem from './MailItem';

type MailSentListProps = {
  isRefetch: boolean;
  setIsRefetch: Dispatch<SetStateAction<boolean>>;
};

/**
 * `MailSentList` component renders a list of emails sent by the current user. It fetches the sent mail data
 * using the `useMailsBySenderQuery` hook, based on the user's email address. This component allows users to
 * navigate to the detail view of a specific mail item and supports manual refresh to update the list of sent emails.
 *
 * @param isRefetch - Boolean state indicating if a refetch of the mail list is requested.
 * @param setIsRefetch - Function to update the `isRefetch` state, used to control the refresh mechanism.
 *
 * Features include:
 * - A header displaying "Sent" alongside a `SendOutlined` icon.
 * - A loading state during data fetching, with an animated spinner.
 * - A message indicating "No mails" when the list is empty.
 * - Each list item is clickable, triggering the `onClickDetail` callback.
 * - Sent mails are listed with their subject, sender's email, and the timestamp of when the mail was sent.
 *
 * The component uses Ant Design's `List`, `Avatar`, `Button`, and `Space` components to create a user-friendly interface.
 * It utilizes the `useEffect` hook to trigger a refetch based on the `isRefetch` state, allowing the list to be updated
 * on demand. This is particularly useful for ensuring that the list reflects the latest changes after sending new emails.
 */
const MailSentList: FC<MailSentListProps> = ({
  isRefetch,
  setIsRefetch,
}) => {
  const user = useAppSelector((state) => state.user.value);
  const { data, isLoading, refetch } = useMailsBySenderQuery(
    user?.email || '',
    {
      refetchOnMountOrArgChange: true,
    },
  );
  useEffect(() => {
    if (isRefetch) {
      refetch();
      setIsRefetch(false);
    }
  }, [isRefetch, setIsRefetch]);

  return (
    <List<Mail>
      header={
        <Space>
          <h3>Sent</h3>
          <SendOutlined />
        </Space>
      }
      style={{ overflow: 'auto', height: '100%' }}
      dataSource={data?.data}
      loading={isLoading}
      locale={{ emptyText: <Empty description="No mails" /> }}
      renderItem={(mail) => (
        <MailItem
          mail={mail}
          refetch={refetch}
        />
      )}
    />
  );
};

export default MailSentList;
