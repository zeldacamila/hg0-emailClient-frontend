import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import './SignUpForm.css';
import { UserRegister } from '../../types/user';
import { useSignupMutation } from '../../features/auth/authAPI';
import { useAppDispatch } from '../../hooks';
import { setToken, setUser } from '../../features/auth/userSlice';

/**
 * `SignUpForm` provides a user interface for new users to create an account. It collects user information
 * including username, email (automatically appending "@awesomemail.com" to the provided username), and password.
 * Upon successful registration, it uses the `useSignupMutation` hook to send the user's data to the backend,
 * displays a success message, and updates the global state with the user's token and details.
 *
 * The form enforces specific validation rules for the password, requiring a mix of upper and lower case letters,
 * numbers, and symbols, and must be at least 8 characters long. It also includes a field for confirming the password,
 * ensuring that the user accurately types their intended password.
 *
 * In case of any errors during the signup process (username already taken, email already registered),
 * it displays an appropriate error message. If the error is not specifically related to the email or username,
 * a generic error message prompts the user to try again later.
 *
 * The component uses Ant Design's `Form`, `Input`, and `Button` components for a cohesive and accessible user interface.
 * It also provides a link for users who already have an account to navigate to the login page.
 *
 */
const SignUpForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [signup] = useSignupMutation();

  const onFinish = (values: UserRegister) => {
    const modifiedValues = {
      ...values,
      email: `${values.email}@awesomemailbox.net`,
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
          <Input
            placeholder="Username"
            onChange={(value) =>
              form.setFieldValue('email', value.target.value)
            }
          />
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
          <Input placeholder="Email" suffix="@awesomemailbox.net" disabled />
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
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^$*.[\]{}()?!"@#%&/,><':;|_~]).{8,}$/.test(
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
  );
};

export default SignUpForm;
