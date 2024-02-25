import { Button, Form, Input } from 'antd';
import { MailTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Login.css';

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
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="sign-up-link-container">
            Don't have an account?{' '}
            <Link to="/signup" className="sign-up-link">
              Register now!
            </Link>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
