import { Button, Form, Input, Row, message } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { Mail } from '../../types/mail';
import { SendOutlined } from '@ant-design/icons';
import { useCreateMailMutation } from '../../features/mail/mailAPI';
import { useAppSelector } from '../../hooks';
import { useForm } from 'antd/es/form/Form';

const { Item } = Form;
const { TextArea } = Input;

type MailFormProps = {
  setIsRefetch: Dispatch<SetStateAction<boolean>>;
};

/**
 * `MailForm` is a functional component that renders a form for composing and sending emails.
 * It provides input fields for the recipient's email, subject, and body of the mail. Upon submission,
 * it utilizes the `useCreateMailMutation` hook to send the composed mail through the application's mail API.
 *
 * @param setIsRefetch - A state setter function from the parent component to trigger refetching of mail lists
 *                        to reflect the newly sent email.
 *
 * The component uses Ant Design's `Form`, `Input`, and `TextArea` components for the UI,
 * ensuring a consistent and user-friendly experience. It also displays a loading indicator on the send button
 * while the mail sending request is in progress, and shows success or error messages upon completion or failure
 * of the request.
 *
 */
const MailForm: FC<MailFormProps> = ({ setIsRefetch }) => {
  const user = useAppSelector((state) => state.user.value);
  const [createMail, { isLoading }] = useCreateMailMutation();
  const [form] = useForm<Mail>();

  const onSubmit = (values: Partial<Mail>) => {
    if (user) {
      const mail = {
        ...values,
        sender_email: user.email,
        timestamp: new Date(),
        status: false,
      };
      createMail(mail)
        .unwrap()
        .then((d) => {
          message.success(d.message);
          setIsRefetch((prev) => !prev);
          form.resetFields();
        })
        .catch(() => {
          message.error('Failed to send email. Please try again.');
        });
    }
  };
  return (
    <Form<Mail> onFinish={onSubmit} form={form}>
      <Item name="recipient_email" required>
        <Input
          prefix="To "
          placeholder="email@awesomemail.com"
          type="email"
          autoCapitalize="none"
          required
        />
      </Item>
      <Item name="subject" required>
        <Input prefix="Subject " placeholder="Subject" required />
      </Item>
      <Item name="body" required>
        <TextArea placeholder="Compose email" required />
      </Item>
      <Row justify="end">
        <Button
          type="primary"
          htmlType="submit"
          icon={<SendOutlined />}
          loading={isLoading}
        >
          Send
        </Button>
      </Row>
    </Form>
  );
};

export default MailForm;
