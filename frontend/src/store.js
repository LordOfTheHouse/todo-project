import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './slices/taskSlice'
import userSlice from './slices/userSlice'
import categorySlice from "./slices/categorySlice";
export default configureStore({
    reducer: {
        task:taskSlice,
        user: userSlice,
        category: categorySlice,
    }
})