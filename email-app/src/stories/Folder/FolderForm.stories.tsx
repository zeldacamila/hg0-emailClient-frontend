import { StoryFn, Meta } from '@storybook/react';
import FolderForm from '../../components/Folder/FolderForm';
import { Provider } from 'react-redux';
import { store } from '../../store'; // Assuming your store is accessible
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Componentes/Folder/FolderForm',
  component: FolderForm,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<typeof FolderForm> = (args) => (
  <BrowserRouter>
  <Provider store={store}>
    <FolderForm {...args} />
  </Provider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {}; // No need for specific props since component doesn't have any


