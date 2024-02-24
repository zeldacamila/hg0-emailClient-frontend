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

const MailContainer: FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [openMailForm, setOpenMailForm] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuProps['selectedKeys']>(['2']);
    const [renderType, setRenderType] = useState<ElementTypes>('mailInboxList');
    const [idMailDetail, setIdMailDetail] = useState<number>();
    const [refetch, setRefetch] = useState(false);

    const render = {
        detail: (
          <MailDetail 
            onBack={() => {
              setIdMailDetail(undefined)
              setSelectedMenuItem(['2'])
            }} 
            id={idMailDetail} 
          />
        ),
        mailInboxList: <MailInboxList onClickDetail={(id) => setIdMailDetail(id)} />,
        mailSentList: <MailSentList isRefetch={refetch} setIsRefetch={setRefetch} onClickDetail={(id) => setIdMailDetail(id)} />,
    }
    useEffect(() => { 
        if(idMailDetail){
            setRenderType('detail')
        }else{
            setRenderType('mailInboxList')
            setSelectedMenuItem(['2'])
        }
    }, [idMailDetail])
    console.log(idMailDetail)

    return (
    <Layout style={{height: '100vh'}}>
      <Header />
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(v) => setCollapsed(v)} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={selectedMenuItem}
            onChange={(e) => console.log(e)}
            style={{ height: '100%', borderRight: 0 }}
            items={[
                { key: 1, icon: <EditFilled />, label: 'Compose', onClick: () => setOpenMailForm(true), dashed: true },
                { key: 2, icon: <InboxOutlined />, label: 'Inbox', onClick: () => setRenderType('mailInboxList')},
                { key: 3, icon: <SendOutlined />, label:'Sent', onClick: () => setRenderType('mailSentList')},
            ]}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>
            {render[renderType]}
            <Modal
                onCancel={() => {
                    setSelectedMenuItem(['2'])
                    setOpenMailForm(false)
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