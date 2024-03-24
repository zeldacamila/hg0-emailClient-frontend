import { StoryFn, Meta } from '@storybook/react';
import Login from '../../components/Login/Login';
import { Provider } from 'react-redux';
import { store } from '../../store'; // Assuming your store is accessible
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Componentes/Login/Login',
  component: Login,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<typeof Login> = (args: {}) => (
  <BrowserRouter>
  <Provider store={store}>
    <Login {...args} />
  </Provider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {}; // No need for specific props since component doesn't have any
