import MailSentList from '../../components/Mail/MailSentList';
import { StoryFn, Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../store'; // Assuming your store is accessible
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Componentes/Mail/MailSentList',
  component: MailSentList,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<typeof MailSentList> = (args) => (
  <BrowserRouter>
  <Provider store={store}>
    <MailSentList {...args} />
  </Provider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {}; // No need for specific props since component doesn't have any
