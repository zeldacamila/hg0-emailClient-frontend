import { Button, Result } from 'antd';

const NotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="The page you visited does not exist"
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default NotFound;
