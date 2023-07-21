import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        },

        logoutUser: state => {
            state.isLoggedIn = false;
        },
    },
});

export const { loginUser, logoutUser } = UserSlice.actions;

export default UserSlice.reducer;