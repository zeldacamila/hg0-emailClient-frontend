import MailContainer from '../../components/Mail/MailContainer';
import { StoryFn, Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../store'; // Assuming your store is accessible
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Componentes/Mail/MailContainer',
  component: MailContainer,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<typeof MailContainer> = (args) => (
  <BrowserRouter>
  <Provider store={store}>
    <MailContainer {...args} />
  </Provider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {}; // No need for specific props since component doesn't have any



