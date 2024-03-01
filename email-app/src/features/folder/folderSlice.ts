import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Folder } from '../../types/folder';

type FolderState = {
    value: string;
    folder?: Folder;
};
const initialState: FolderState = {
    value: 'inbox',
    folder: undefined,
};

/**
 * A slice that provides methods for interacting with the folder endpoint. 
 * Contains the initial state, reducers, and actions.
 * name: The name of the slice. This will be the name of the reducer.
 * initialState: The initial state of the slice.
 * reducers: An object containing the reducers for the slice.
 * actions: An object containing the actions for the slice.
 * setFolder: A reducer that sets the folder.
 */
const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        setFolder: (state, action: PayloadAction<FolderState>) => {
            state.value = action.payload.value;
            state.folder = action.payload.folder; 
        },
    },
});

export const { setFolder } = folderSlice.actions;
export default folderSlice.reducer;

