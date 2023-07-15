import {createSlice} from '@reduxjs/toolkit'


export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: [],
        curCategory: -1,
        cart: null
    },
    reducers: {
        set: (state, action) => {
            state.category = action.payload;
            if(!state.cart){
                state.cart = action.payload.filter(category => category.name === 'Корзина')[0];
            }
        },
        setCategory: (state, action) => {
            state.curCategory = action.payload;
        },
    }
})

export const {set, setCategory} = categorySlice.actions

export default categorySlice.reducer