import {createSlice} from '@reduxjs/toolkit'


export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        curTask: {},
        statuses: [],
        priorities: [],
        regularities: []
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setStatuses: (state, action) => {
            state.statuses = action.payload;
        },
        setPriorities: (state, action) => {
            state.priorities = action.payload;
        },
        setRegularities: (state, action) => {
            state.regularities = action.payload;
        },
        setCurrentTask: (state, action) => {
            state.curTask = action.payload;
        },
    }
})

export const {setTasks, setStatuses, setPriorities, setRegularities, setCurrentTask} = taskSlice.actions

export default taskSlice.reducer