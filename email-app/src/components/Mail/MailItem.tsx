import { Avatar, Button, List, Space, message } from "antd";
import { FC, MouseEvent } from "react";
import { Mail } from "../../types/mail";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useDeleteMailMutation } from "../../features/mail/mailAPI";
import { useAppDispatch } from "../../hooks";
import { setMail } from "../../features/mail/mailSlice";

import dayjs from "dayjs";

const { Item } = List;

type MailItemProps = {
    mail: Mail;
    refetch: () => void;
    showButtonDelete?: boolean;
};

/**
 * `MailItem` displays a single mail item in the list, including the sender's avatar, subject, and timestamp.
 * It supports both inbox and sent views, and allows users to delete emails from the list.
 *
 * @param mail - The mail item to be displayed.
 * @param refetch - A function to trigger refetching of the mail list to reflect the changes.
 * @param showButtonDelete - A boolean to control the visibility of the delete button.
 * Uses `useDeleteMailMutation` to delete the mail item from the list and shows a success message when the operation is successful.
 *
 */
const MailItem: FC<MailItemProps> = ({
    mail,
    refetch,
    showButtonDelete = true,
}) => {
    const { id, status, subject, sender, timestamp } = mail;
    const dispatch = useAppDispatch();
    const [deleteMail] = useDeleteMailMutation();

    const onClickDetail = () => {
        dispatch(setMail({ value: mail,  }));
    };

    const onClickDelete = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        deleteMail(id)
            .unwrap()
            .then(() => {
                refetch();
                message.success('Email deleted successfully');
            })
            .catch((e) => {
                message.error(e.message);
            });
    };

    return (
        <Item
          style={{
            cursor: 'pointer',
            backgroundColor: status ? '#f0f2f3' : 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
          onClick={onClickDetail}
          className="mail-item"
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
              <Space size={15} direction="vertical">
                {sender.email}
                {dayjs(timestamp).format('dddd, MMMM DD [at] HH:mm')}
              </Space>
            }
          />
          {
            showButtonDelete && (
              <Button
                icon={<DeleteOutlined  />}
                danger
                onClick={onClickDelete}
              />
            )
          }
          
        </Item>
    );
};

export default MailItem;

