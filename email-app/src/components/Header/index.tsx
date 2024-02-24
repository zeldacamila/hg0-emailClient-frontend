import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Layout, Dropdown, Avatar  } from 'antd';
import { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { removeUser } from '../../features/auth/userSlice';

const { Header } = Layout;

const HeaderComponent: FC = () => {
    const dispatch = useAppDispatch();
    return (
    <Header
     style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          items={[
            { key: 1, label: (
                <Dropdown menu={{ 
                    items: [
                        { 
                            key: 2, 
                            label: 'Logout',
                            icon: <LogoutOutlined />,
                            onClick: () => dispatch(removeUser()),
                        }
                    ]
                    }} 
                    placement="bottomLeft"
                 >
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </Dropdown>
            ),
        
        },
          ]}
          style={{ flex: 1, justifyContent: 'flex-end'}}
        />
      </Header>
    );
};

export default HeaderComponent;