import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';
/**
 * `NotFound` is a functional component that renders a 404 Not Found page using Ant Design's `Result` component.
 * It displays a message indicating that the requested page does not exist and provides a button to navigate
 * back to the homepage.
 *
 */
const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="The page you visited does not exist"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
