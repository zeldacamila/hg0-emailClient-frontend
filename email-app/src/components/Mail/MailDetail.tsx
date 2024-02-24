import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Layout, Row, Space, Spin } from 'antd';
import { FC } from 'react';
import { useMailByIdQuery } from '../../features/mail/mailAPI';
import dayjs from 'dayjs';

const { Content } = Layout;
type MailDetailProps = {
    onBack: () => void;
    id?: number;
}
const MailDetail: FC<MailDetailProps> = ({
    onBack,
    id,
}) => {
  const { data, isLoading } = useMailByIdQuery(id || 0);
    console.log(data)
  return (
    <Content style={{ padding: 30}}>
        {
            isLoading ? (
                <Row justify="center"><Spin /></Row>
            ):
            (
                <>
                <Row justify="space-between"> 
                <Space wrap size={10} align="center">
                    <Button onClick={onBack} type='text' icon={<ArrowLeftOutlined />} />
                    <Avatar icon={<UserOutlined />} />
                    <h3>{data?.data?.subject}</h3>
                    <h4>{data?.data?.sender.email}</h4>
                </Space>
                <p>{dayjs(data?.data?.timestamp).format('DD-MM-YY')}</p>
                </Row>
                <Divider />
                <p>{data?.data?.body}</p>
                </>
            )
        }
    </Content>
  );
};

export default MailDetail;