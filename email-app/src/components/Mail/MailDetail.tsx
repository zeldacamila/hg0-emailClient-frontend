import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Layout, Row, Space, Spin } from 'antd';
import { FC, useEffect } from 'react';
import {
  useMailByIdQuery,
  useReadMailMutation,
} from '../../features/mail/mailAPI';
import dayjs from 'dayjs';

const { Content } = Layout;
type MailDetailProps = {
  onBack: (to: string) => void;
  from: 'sent' | 'inbox';
  id?: number;
};

/**
 * `MailDetail` displays the detailed view of a mail item, including sender information, subject, and body.
 * It supports both 'inbox' and 'sent' views, dynamically adjusting its content based on the provided `id`.
 *
 * @param onBack - Function to navigate back to the previous view ('mailInboxList' or 'mailSentList').
 * @param from - Indicates the origin of the mail item ('sent' or 'inbox') to conditionally trigger read actions.
 * @param id - The unique identifier of the mail item to fetch and display.
 *
 * Uses `useMailByIdQuery` to fetch the mail details using the `id` and using `useReadMailMutation` to mark
 * an inbox item as read making sure the inbox stays up-to-date. It shows a loading spinner while fetching data.
 *
 */
const MailDetail: FC<MailDetailProps> = ({ onBack, from, id }) => {
  const { data, isLoading } = useMailByIdQuery(id || 0);
  const [readMail] = useReadMailMutation();

  useEffect(() => {
    const { status, id } = data?.data || {};
    if (!status && id && from === 'inbox') {
      readMail(id);
    }
  }, [id]);
  return (
    <Content style={{ padding: 30 }}>
      {isLoading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        <>
          <Row justify="space-between">
            <Space wrap size={10} align="center">
              <Button
                onClick={() => {
                  const to = from === 'sent' ? 'mailSentList' : 'mailInboxList';
                  onBack(to);
                }}
                type="text"
                icon={<ArrowLeftOutlined />}
              />
              <Avatar icon={<UserOutlined />} />
              <h3>{data?.data?.subject}</h3>
              <h4>{data?.data?.sender.email}</h4>
            </Space>
            <p>{dayjs(data?.data?.timestamp).format('DD-MM-YY')}</p>
          </Row>
          <Divider />
          <p>{data?.data?.body}</p>
        </>
      )}
    </Content>
  );
};

export default MailDetail;
