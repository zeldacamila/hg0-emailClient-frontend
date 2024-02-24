import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { User } from '../../types/user';

type UserState = {
    value: User | null;
    token: string | null;
};

const initialState: UserState  = {
    value: null,
    token: null,
};
/**
 * A slice that provides methods for interacting with the user endpoint. 
 * Contains the initial state, reducers, and actions.
 * name: The name of the slice. This will be the name of the reducer.
 * initialState: The initial state of the slice.
 * reducers: An object containing the reducers for the slice.
 * actions: An object containing the actions for the slice.
 * setUser: A reducer that sets the user, status, and error.
 * setToken: A reducer that sets the token.
 * removeUser: A reducer that removes the user,  
 */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.value = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        removeUser: (state) => {
            state.value = null;
            state.token = null;
        },
    },
});

export const { setUser, removeUser, setToken } = userSlice.actions;
export default userSlice.reducer;