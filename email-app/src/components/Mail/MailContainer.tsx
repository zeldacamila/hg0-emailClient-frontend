import { FC, useEffect, useState } from 'react';
import { EditFilled, InboxOutlined, SendOutlined } from '@ant-design/icons';
import { MenuProps, Modal } from 'antd';
import { Layout, Menu } from 'antd';
import Header from '../Header';
import MailForm from './MailForm';
import MailDetail from './MailDetail';
import MailInboxList from './MailInboxList';
import MailSentList from './MailSentList';

const { Content, Sider } = Layout;
type ElementTypes = 'mailInboxList' | 'detail' | 'mailSentList';

/**
 * `MailContainer` is a component that serves as the primary container for the mail-related functionalities
 * within the application. It orchestrates the display of mail lists (inbox and sent), mail detail views,
 * and the mail composition form.
 *
 * The component utilizes Ant Design's `Layout`, `Menu`, and `Modal` components to structure the UI and
 * manage navigation between different views of the mail system, such as viewing the inbox list, sent list,
 * and reading or composing emails.
 *
 * It maintains internal state to control:
 * - The collapsed state of the side navigation (`Sider`).
 * - The visibility of the mail composition form (`Modal`).
 * - The currently selected menu item to highlight the active view.
 * - The type of content to render (`mailInboxList`, `detail`, or `mailSentList`).
 * - The ID of the mail item to display in detail view.
 * - A flag to trigger refetching of mail lists.
 * - The origin (`sent` or `inbox`) of the mail item currently being viewed in detail.
 *
 * This dynamic rendering is managed through state hooks and conditional rendering based on the current
 * state values.
 */
const MailContainer: FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [openMailForm, setOpenMailForm] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<
    MenuProps['selectedKeys']
  >(['2']);
  const [renderType, setRenderType] = useState<ElementTypes>('mailInboxList');
  const [idMailDetail, setIdMailDetail] = useState<number>();
  const [refetch, setRefetch] = useState(false);
  const [origin, setOrigin] = useState<'sent' | 'inbox'>('inbox');

  const render = {
    detail: (
      <MailDetail
        onBack={(to) => {
          setRenderType(to as ElementTypes);
          setSelectedMenuItem([to === 'mailInboxList' ? '2' : '3']);
          setIdMailDetail(undefined);
        }}
        id={idMailDetail}
        from={origin}
      />
    ),
    mailInboxList: (
      <MailInboxList
        onClickDetail={(id, to) => {
          setIdMailDetail(id);
          setOrigin(to);
        }}
      />
    ),
    mailSentList: (
      <MailSentList
        isRefetch={refetch}
        setIsRefetch={setRefetch}
        onClickDetail={(id, to) => {
          setIdMailDetail(id);
          setOrigin(to);
        }}
      />
    ),
  };
  useEffect(() => {
    if (idMailDetail) {
      setRenderType('detail');
    }
  }, [idMailDetail]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(v) => setCollapsed(v)}
          width={200}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={selectedMenuItem}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: 1,
                icon: <EditFilled />,
                label: 'Compose',
                onClick: () => setOpenMailForm(true),
                dashed: true,
              },
              {
                key: 2,
                icon: <InboxOutlined />,
                label: 'Inbox',
                onClick: () => setRenderType('mailInboxList'),
              },
              {
                key: 3,
                icon: <SendOutlined />,
                label: 'Sent',
                onClick: () => setRenderType('mailSentList'),
              },
            ]}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>
            {render[renderType]}
            <Modal
              onCancel={() => {
                setSelectedMenuItem(['2']);
                setOpenMailForm(false);
              }}
              open={openMailForm}
              title="New Message"
              footer={null}
            >
              <MailForm setIsRefetch={setRefetch} />
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MailContainer;
