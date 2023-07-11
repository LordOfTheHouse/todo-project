import {createSlice} from '@reduxjs/toolkit'


export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: [],
        curCategory: 1
    },
    reducers: {
        set: (state, action) => {
            state.category = action.payload;
        },
        setCategory: (state, action) => {
            state.curCategory = action.payload;
        },
    }
})

export const {set, setCategory} = categorySlice.actions

export default categorySlice.reducer