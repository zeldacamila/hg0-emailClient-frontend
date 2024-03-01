import { Button, Form, Input, Row, message } from 'antd';
import { FC } from 'react';
import { SendOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../hooks';
import { useForm } from 'antd/es/form/Form';
import { Folder } from '../../types/folder';
import { useCreateFolderMutation } from '../../features/folder/folderAPI';

const { Item } = Form;

type FolderFormProps = {
  refetch: () => void;
};

/**
 * FolderForm is a functional component that renders a form for composing and sending emails.
 * 
 * @param refetch - A function to trigger refetching of folder lists to reflect the newly sent email.
 * 
 */

const FolderForm: FC<FolderFormProps> = ({ refetch }) => {
  const user = useAppSelector((state) => state.user.value);
  const [createFolder, { isLoading }] = useCreateFolderMutation();
  const [form] = useForm<Folder>();

  const onSubmit = (values: Partial<Folder>) => {
    if (user) {
      createFolder(values)
        .unwrap()
        .then((d) => {
          message.success(d.message);
          refetch()
          form.resetFields();
        })
        .catch(() => {
          message.error('Failed to create folder. Please try again.');
        });
    }
  };
  return (
    <Form<Folder> 
        onFinish={onSubmit} 
        form={form}
        layout='vertical'
    >
      <Item 
        label="Folder Name"
        name="name" 
        required
      >
        <Input
          placeholder="Folder Name"
          autoCapitalize="none"
          required
        />
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

export default FolderForm;
