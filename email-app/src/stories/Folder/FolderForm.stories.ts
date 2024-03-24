import FolderForm from '../../components/Folder/FolderForm';
import { Meta } from '@storybook/react';
const meta = {
  title: 'Componentes/Folder/FolderForm',
  component: FolderForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    
  },
} satisfies Meta<typeof FolderForm>;

export default meta;

