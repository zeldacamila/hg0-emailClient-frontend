import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Layout, Dropdown, Avatar } from 'antd';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeUser } from '../../features/auth/userSlice';

const { Header } = Layout;

/**
 * `HeaderComponent` is a functional component that renders the application's header.
 * It displays a welcome message with the current username that is logged, and provides
 * a dropdown menu for logout.
 *
 * Utilizes Ant Design's `Layout.Header`, `Menu`, `Dropdown`, and `Avatar` components to
 * construct the UI, and integrates with Redux for state management and event handling.
 *
 * This component makes use of the `useAppDispatch` hook from the project's custom hooks
 * to access the Redux dispatch function, and the `useAppSelector` hook to access the
 * current user's state from the Redux store. It triggers the `removeUser` action from
 * the `userSlice` when the logout option is selected.
 *
 * The header is styled to display its contents flexibly aligned to the end, and it
 * adapts the dark theme from Ant Design for the `Menu`.
 */
const HeaderComponent: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value)?.username;
  return (
    <Header style={{ display: 'flex', alignItems: 'flex-end' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        selectable={false}
        items={[
          {
            key: 2,
            label: <span>Welcome {user || ''} </span>,
          },
          {
            key: 1,
            label: (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 2,
                      label: 'Logout',
                      icon: <LogoutOutlined />,
                      onClick: () => dispatch(removeUser()),
                    },
                  ],
                }}
                placement="bottomLeft"
              >
                <Avatar
                  style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            ),
          },
        ]}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      />
    </Header>
  );
};

export default HeaderComponent;
