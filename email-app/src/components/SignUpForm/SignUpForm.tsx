import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import './SignUpForm.css';
import { UserRegister } from '../../types/user';
import { useSignupMutation } from '../../features/auth/authAPI';
import { useAppDispatch } from '../../hooks';
import { setToken, setUser } from '../../features/auth/userSlice';

const SignUpForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [signup] = useSignupMutation();

  const onFinish = (values: UserRegister) => {
    const modifiedValues = {
      ...values,
      email: `${values.email}@awesomemail.com`,
    };
    signup(modifiedValues)
      .unwrap()
      .then((data) => {
        message.success(data?.message);
        if (data.data) {
          dispatch(setToken(data.data.access_token));
          dispatch(setUser(data.data.user));
        }
      })
      .catch((e) => {
        if (e.data?.message?.email) {
          message.error(e.data.message.email[0]);
        } else if (e.data?.message?.username) {
          message.error(e.data.message.username[0]);
        } else {
          message.error(
            'An unexpected error occurred. Please try again later.',
          );
        }
      });
  };

  return (
    <>
      <Form<UserRegister>
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item>
          <h1>Create an account</h1>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
        >
          <Input placeholder="Username" />
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

        <Form.Item
          name="password2"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="sign-in-link-container">
            Already have an account?{' '}
            <Link to="/login" className="sign-in-link">
              Sign in
            </Link>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUpForm;
