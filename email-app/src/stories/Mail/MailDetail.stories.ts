import MailDetail from '../../components/Mail/MailDetail';
import { Meta,StoryObj } from '@storybook/react';
const meta = {
  title: 'Componentes/Mail/MailDetail',
  component: MailDetail,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    
  },
} satisfies Meta<typeof MailDetail>;

export default meta;
type Story = StoryObj<typeof meta>;
export const LoggedIn: Story = {};