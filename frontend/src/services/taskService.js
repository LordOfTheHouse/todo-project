import axios from "axios";
import {setStatuses, setTasks, setRegularities, setPriorities, setCurrentTask} from "../slices/taskSlice";
import authHeader from "./authHeader";
import {API_URL} from "./API_URL";
import {message} from "antd";

const API_URL_TASK = "/tasks"

const getTasks = (dispatch) => {
    return axios.get(API_URL_TASK, {headers: authHeader()}).then(
        (response) => {
            dispatch(setTasks(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            message.error(_content)
            dispatch(setTasks([]));
        });
};

const getTask = (dispatch, id) => {
    return axios.get(API_URL_TASK+`/${id}`, {headers: authHeader()}).then(
        (response) => {
            dispatch(setCurrentTask(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            message.error(_content)
            dispatch(setTasks([]));
        });
};

const getNowTask = (dispatch) => {
    return axios.get(API_URL_TASK+`/now`, {headers: authHeader()}).then(
        (response) => {
            dispatch(setTasks(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            message.error(_content)
            dispatch(setTasks([]));
        });
};

const getArchiveTask = (dispatch) => {
    return axios.get(API_URL_TASK+`/archive`, {headers: authHeader()}).then(
        (response) => {
            dispatch(setTasks(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            message.error(_content)
            dispatch(setTasks([]));
        });
};

const getTasksByCategory = (dispatch, id) => {
    return axios.get(`${API_URL_TASK}/categories?categoryId=${id}`, {headers: authHeader()}).then(
        (response) => {
            console.log(response.data)
            dispatch(setTasks(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            message.error(_content)
            dispatch(setTasks([]));
        });
};
const getTaskNotify = (dispatch) => {
    return axios.get(API_URL_TASK + `/notify`, {headers: authHeader()}).then(
        (response) => {
            dispatch(setTasks(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            message.error(_content)
            dispatch(setTasks([]));
        });
};

const getNotifyMessage = (dispatch) => {
    return axios.get(API_URL_TASK + `/notify`, {headers: authHeader()}).then(
        (response) => {
            if(response.data){
                response.data.forEach(task=> message.success(task.title + " СРОКИ ЖМУТ"));
            }
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.log(_content
            );
        });
};

setInterval(getNotifyMessage, 50000);

export const getStatuses = (dispatch) => {
    return axios.get(`/tasks/statuses`,  {headers: authHeader()}).then(
        (response) => {
            dispatch(setStatuses(response.data));
            console.log(response.data)
            },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content)
            dispatch(setStatuses([]));
        });
};

export const getRegularities = (dispatch) => {
    return axios.get(`/tasks/regularities`,  {headers: authHeader()}).then(
        (response) => {
            dispatch(setRegularities(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content)
            dispatch(setRegularities([]));
        });
};

export const getPriorities = (dispatch) => {
    return axios.get(`/tasks/priorities`,  {headers: authHeader()}).then(
        (response) => {
            dispatch(setPriorities(response.data));

        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content)
            dispatch(setPriorities([]));
        });
};

export const createTask = ( dispatch, task) => {
    return axios.post(API_URL_TASK, task,  {headers: authHeader()}).then(
        (response) => {
            getTasksByCategory(dispatch, task.category.id)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content);
            message.error("Действие невозможно");
        });
};

const updateTask = (dispatch, task) => {
    return axios.put(API_URL_TASK, task, {headers: authHeader()}).then(
        (response) => {
            getTasksByCategory(dispatch, task.category.id)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content);
            message.error("недостаточно прав доступа");
        });
};

const deleteTask = (dispatch, task) => {
    return axios.delete(API_URL_TASK + `/${task.id}`, {headers: authHeader()}).then(
        (response) => {
            getTasksByCategory(dispatch, task.croppedCategory.id)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content);
            message.error("недостаточно прав доступа");
        });
};

const taskService = {
    getTaskNotify, getTask,getTasks, createTask, deleteTask, getTasksByCategory
    , updateTask, getPriorities, getStatuses, getRegularities, getArchiveTask, getNowTask
};

export default taskService