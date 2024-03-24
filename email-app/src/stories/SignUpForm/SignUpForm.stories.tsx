import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { StoryFn, Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../store'; // Assuming your store is accessible
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

export default {
  title: 'Componentes/SignUp/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<typeof SignUpForm> = (args: {}) => (
  <BrowserRouter>
    <Provider store={store}>
      <SignUpForm {...args} />
    </Provider>
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {}; // No need for specific props since component doesn't have any
