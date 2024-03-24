import Login from '../../components/Login/Login';
import { Meta,StoryObj } from '@storybook/react';


const meta = {
  title: 'Componentes/Login/Login',
  component: Login,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    
  },
} satisfies Meta<typeof Login>;
export default meta;
type Story = StoryObj<typeof meta>;
export const LoggedIn: Story = {
  args: {
    onFinish(values: any) {
      
    }
  },
};






