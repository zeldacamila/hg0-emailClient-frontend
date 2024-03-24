import MailGenericList from '../../components/Mail/MailGenericList';
import { Meta,StoryObj } from '@storybook/react';
const meta = {
  title: 'Componentes/Mail/MailGenericList',
  component: MailGenericList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    
  },
} satisfies Meta<typeof MailGenericList>;

export default meta;
type Story = StoryObj<typeof meta>;
export const LoggedIn: Story = {};