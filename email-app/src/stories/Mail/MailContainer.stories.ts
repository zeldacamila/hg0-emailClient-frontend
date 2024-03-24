import MailContainer from '../../components/Mail/MailContainer';
import { Meta,StoryObj } from '@storybook/react';

const meta = {
  title: 'Componentes/Mail/MailContainer',
  component: MailContainer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    
  },
} satisfies Meta<typeof MailContainer>;

export default meta;
type Story = StoryObj<typeof meta>;
export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};


