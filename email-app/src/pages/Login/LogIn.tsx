import Login from '../../components/Login/Login';

import './Login.css';

/**
 * `LogIn` serves as a simple container for the `Login` component, providing an additional layer of abstraction
 * and potentially a space for further customization or additional content around the login form in the future.
 *
 * This component acts as a wrapper that encapsulates the `Login` component within a div element,
 * applying container-specific styles for layout or visual presentation as defined in `Login.css`.
 *
 *
 */

const LogIn: React.FC = () => {
  return (
    <div className="login-container">
      <Login />
    </div>
  );
};

export default LogIn;
