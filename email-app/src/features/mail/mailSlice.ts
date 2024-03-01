import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { Mail } from '../../types/mail';

type MailState = {
    value: Mail | null;
};

const initialState: MailState  = {
    value: null,
};

/**
 * A slice that provides methods for interacting with the mail endpoint. 
 * Contains the initial state, reducers, and actions.
 * name: The name of the slice. This will be the name of the reducer.
 * initialState: The initial state of the slice.
 * reducers: An object containing the reducers for the slice.
 * actions: An object containing the actions for the slice.
 * setMail: A reducer that sets the mail.
 */

const mailSlice = createSlice({
    name: 'mail',
    initialState,
    reducers: {
        setMail: (state, action: PayloadAction<MailState>) => {
            state.value = action.payload.value; 
        },
        removeMail: (state) => {
            state.value = null;
        },
    },
});

export const { setMail, removeMail } = mailSlice.actions;

export default mailSlice.reducer;