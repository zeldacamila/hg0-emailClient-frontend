import { ArrowLeftOutlined, MedicineBoxOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Dropdown, Flex, Layout, Row, Spin, Tooltip, message } from 'antd';
import { FC, useEffect } from 'react';
import {
  useAddEmailToFolderMutation,
  useMailByIdQuery,
  useReadMailMutation,
} from '../../features/mail/mailAPI';
import dayjs from 'dayjs';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { removeMail } from '../../features/mail/mailSlice';
import { Folder } from '../../types/folder';

const { Content } = Layout;
const { Meta } = Card;

type MailDetailProps = {
  folders: Folder[] | undefined;
};

/**
 * `MailDetail` displays the detailed view of a mail item, including sender information, subject, and body.
 * It supports both 'inbox' and 'sent' views, dynamically adjusting its content based on the provided `id`.
 *
 * @param folders - The list of folders to which the mail can be added.
 * Uses `useMailByIdQuery` to fetch the mail details using the `id` and using `useReadMailMutation` to mark
 * an inbox item as read making sure the inbox stays up-to-date. It shows a loading spinner while fetching data.
 *
 */
const MailDetail: FC<MailDetailProps> = ({ folders }) => {
  const mail = useAppSelector((state) => state.mail.value);
  const folder = useAppSelector((state) => state.folder.value);
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useMailByIdQuery(`${mail?.id ?? 0}`, {refetchOnMountOrArgChange: true});
  const [readMail] = useReadMailMutation();
  const [addEmailToFolder] = useAddEmailToFolderMutation();

  useEffect(() => {
    const { status, id } = data?.data || {};
    if (!status && id && data?.data?.sender.email !== user?.email) {
      readMail(id);
    }
  }, [mail, folder]);


  const items: any = folders?.map((folder) => ({
    key: folder.id,
    label: `Add to ${folder.name}`,
    onClick: () => {
        addEmailToFolder({ email: mail?.id || 0, folder: folder.id.toString() })
            .unwrap()
            .then(() => {
                message.success('Email added to folder successfully');
            })
            .catch((e) => {
                message.error("Failed to add email to folder. Probably it's already there.");
            });
    },
  }));

  return (
    <Content style={{ paddingTop: 30 }}>
      {isLoading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        <Card 
          title={<Button
            onClick={() => {
              dispatch(removeMail());
            }}
            type="text"
            icon={<ArrowLeftOutlined />}
          />}
          extra={(
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <Tooltip 
                title="Add to folder"
                placement="top"
                children={(
                <Button 
                  icon={<MedicineBoxOutlined />}
                  disabled={!folders?.length}
                  />
                )}
              />
            </Dropdown>
          )}
        >
          <Flex align="start" justify="space-between" wrap="wrap">
              <Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={data?.data?.subject}
                description={data?.data?.sender.email} />
              <Meta
                description={dayjs(data?.data?.timestamp).format('dddd, MMMM DD [at] HH:mm')} />
          </Flex><Divider /><p>{data?.data?.body}</p>
        </Card>       
      )}
    </Content>
  );
};

export default MailDetail;
