import { FC, useEffect, useState } from 'react';
import { EditFilled, FolderOutlined, InboxOutlined, MedicineBoxOutlined, SendOutlined } from '@ant-design/icons';
import { FloatButton, Modal } from 'antd';
import { Layout, Menu } from 'antd';
import Header from '../Header/Header';
import MailForm from './MailForm';
import MailDetail from './MailDetail';
import MailInboxList from './MailInboxList';
import MailSentList from './MailSentList';
import { useAllFolderQuery } from '../../features/folder/folderAPI';
import MailGenericList from './MailGenericList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFolder } from '../../features/folder/folderSlice';
import { removeMail } from '../../features/mail/mailSlice';
import FolderForm from '../Folder/FolderForm';
import MailFilterList from './MailFilterList';

const { Content, Sider } = Layout;
type ElementTypes = 'mailInboxList' | 'detail' | 'mailSentList' | 'mailGeneralList';

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
 * - The type of content to render (`mailInboxList`, `detail`, `mailSentList` or `mailGeneralList`).
 * - The ID of the mail item to display in detail view.
 * - A flag to trigger refetching of mail lists.
 * - The origin (`sent` or `inbox` or `other`) of the mail item currently being viewed in detail.
 *
 * This dynamic rendering is managed through state hooks and conditional rendering based on the current
 * state values.
 */
const MailContainer: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMailForm, setOpenMailForm] = useState(false);
  const [openFolderForm, setOpenFolderForm] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string[]>(['inbox']);
  const [renderType, setRenderType] = useState<ElementTypes>('mailInboxList');
  const [refetch, setRefetch] = useState(false);
  const {data, refetch: refetchFolders} = useAllFolderQuery();
  const dispatch = useAppDispatch();
  const mailDetail = useAppSelector((state) => state.mail.value);
  const folder = useAppSelector((state) => state.folder.value);
  const user = useAppSelector((state) => state.user.value);

  const render = {
    detail: (
      <MailDetail folders={data?.data} />
    ),
    mailInboxList: (
      <MailInboxList />
    ),
    mailSentList: (
      <MailSentList
        isRefetch={refetch}
        setIsRefetch={setRefetch}
      />
    ),
    mailGeneralList: <MailGenericList refetch={refetchFolders} />
  };
  useEffect(() => {
    if (!mailDetail) {
      if (folder === 'inbox') {
        setRenderType('mailInboxList');
        setSelectedMenuItem(['inbox']);
      } else if (folder === 'sent') {
        setRenderType('mailSentList');
        setSelectedMenuItem(['sent']);
      } else {
        setRenderType('mailGeneralList');
      }
    } else {
      setRenderType('detail');

    }
  }, [mailDetail, folder]);

  useEffect(() => {
    if(selectedMenuItem[0] === 'inbox'){
      setRenderType('mailInboxList');
    } else if(selectedMenuItem[0] === 'sent'){
      setRenderType('mailSentList');
    } else {
      setRenderType('mailGeneralList');
    }
    dispatch(removeMail());

  }, [selectedMenuItem]);

  useEffect(() => {
      refetchFolders();
  }, [user]);

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
            style={{ height: '100%', borderRight: 0}}
            items={[
              {
                key: 'inbox',
                icon: <InboxOutlined />,
                label: 'Inbox',
                onClick: () => {
                  setRenderType('mailInboxList')
                  dispatch(removeMail());
                  dispatch(setFolder({value: 'inbox'}))
                },
              },
              {
                key: 'sent',
                icon: <SendOutlined />,
                label: 'Sent',
                onClick: () => {
                  setRenderType('mailSentList')
                  dispatch(removeMail());
                  dispatch(setFolder({value: 'sent'}))
                },
              },
              ...(data?.data?.map((folder) => ({
                icon: <FolderOutlined />,
                key: folder.id.toString(),
                label: folder.name,
                onClick: () => {
                  setRenderType('mailGeneralList')
                  dispatch(removeMail());
                  dispatch(setFolder({value: folder.id.toString(), folder}));
                },
              })) || [])
            ].filter(Boolean)}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>
            {render[renderType]}
            <Modal
              onCancel={() => {
                setOpenMailForm(false);
              }}
              open={openMailForm}
              title="New Message"
              footer={null}
            >
              <MailForm setIsRefetch={setRefetch} />
            </Modal>
            <Modal
              onCancel={() => setOpenFolderForm(false)}
              open={openFolderForm}
              title="New Folder"
              footer={null}
            >
              <FolderForm refetch={refetchFolders} />
            </Modal>
          </Content>
          <FloatButton.Group shape="circle" style={{ right: 24 }}>
            <FloatButton
                tooltip="New Message"
                icon={<EditFilled />} 
                onClick={() => setOpenMailForm(true)} 
            />
            <FloatButton
                tooltip="New Folder"
                icon={<MedicineBoxOutlined />} 
                onClick={() => setOpenFolderForm(true)} 
            />
          </FloatButton.Group>
          <MailFilterList />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MailContainer;
