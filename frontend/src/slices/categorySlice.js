import {createSlice} from '@reduxjs/toolkit'


export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: [],
    },
    reducers: {
        set: (state, action) => {
            state.category = action.payload;
        }
    }
})

export const {set} = categorySlice.actions

export default categorySlice.reducer