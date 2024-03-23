import MailInboxList from '../../components/Mail/MailInboxList';
import { Meta,StoryObj } from '@storybook/react';
const meta = {
  title: 'Componentes/Mail/MailInboxList',
  component: MailInboxList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    
  },
} satisfies Meta<typeof MailInboxList>;

export default meta;
type Story = StoryObj<typeof meta>;
export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};