import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <Form
        form={form}
        name="Login"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item>
          <h1>Login</h1>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input an AwesomeMail address',
            },
          ]}
        >
          <Input placeholder="Email" suffix="@awesomemail.com" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            () => ({
              validator(_, value) {
                if (
                  value &&
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*.\[\]{}()?"!@#%&/\\,><':;|_~`]).{8,}$/.test(
                    value,
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    'Password must contain a mix of upper and lowercase letters, numbers, and symbols, and be at least 8 characters.',
                  ),
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
  
      </Form>
    </>
  );
};

export default Login;
