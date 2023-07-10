import {createSlice} from '@reduxjs/toolkit'


const user = JSON.parse(localStorage.getItem("user"));
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: user?user:null,
        isAuth: !user,

    },
    reducers: {
        set: (state, action) => {
            state.user = action.payload;
        },

        login: (state, action) => {
            state.isAuth = false;
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.isAuth = true;
            state.user = null;
        }

    }
})

export const {logout, login, set, setReg} = userSlice.actions

export default userSlice.reducer