import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Login.css';
import { useAppDispatch } from '../../hooks';
import { useSigninMutation } from '../../features/auth/authAPI';
import { setToken, setUser } from '../../features/auth/userSlice';
import { UserSignin } from '../../types/user';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [signin] = useSigninMutation();

  const onFinish = (values: UserSignin) => {
    console.log('Received values of form: ', values);

    signin(values)
      .unwrap()
      .then((data) => {
        message.success(data?.message);
        if (data.data) {
          dispatch(setToken(data.data.access_token));
          dispatch(setUser(data.data.user));
        }
      })
      .catch((e) => {
        message.error(e.data?.message);
      });
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
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            suffix="@awesomemail.com"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
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
