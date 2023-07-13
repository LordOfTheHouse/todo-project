import axios from "axios";
import {setStatuses, setTasks, setRegularities, setPriorities, setCurrentTask} from "../slices/taskSlice";
import authHeader from "./authHeader";
import {message, notification} from "antd";

const API_URL_TASK = "/tasks"

const getTasks = (dispatch) => {
    return axios.get(API_URL_TASK, {headers: authHeader()}).then(
        (response) => {
            console.log(response.data)
            dispatch(setTasks(response.data.filter(task =>task.croppedCategory.name !== 'Корзина')));
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
            console.log(response.data);
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

const getTaskCart = (dispatch) => {
    return axios.get(API_URL_TASK + `/cart`, {headers: authHeader()}).then(
        (response) => {
            console.log(response.data);
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

const getNotifyMessage = () => {

    return axios.get(API_URL_TASK + `/notify`, {headers: authHeader()}).then(
        (response) => {
            if(response.data){
                response.data.forEach(task=> notification.info({
                    message: task.title,
                    description: `Напоминание о задаче из категории: 
                    ${task.croppedCategory.name}, 
                    задача дожна быть выполнена ${task.dateNotify}`,
                    duration:15
            }));
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

const updateTask = (dispatch, task, idCurrentCategory) => {
    return axios.put(API_URL_TASK, task, {headers: authHeader()}).then(
        (response) => {
            switch (idCurrentCategory) {
                case -5:
                    getTaskCart(dispatch);
                    break;
                case -4:
                    getArchiveTask(dispatch);
                    break;
                case -3:
                    getTaskNotify(dispatch);
                    break;
                case -2:
                    getNowTask(dispatch);
                    break;
                case -1:
                    getTasks(dispatch);
                    break;
                default:
                    getTasksByCategory(dispatch, idCurrentCategory);
            }
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content);
            message.error("недостаточно прав доступа");
        });
};

const deleteTask = (dispatch, task, idCurrentCategory) => {
    return axios.delete(API_URL_TASK + `/${task.id}`, {headers: authHeader()}).then(
        (response) => {
            getTaskCart(dispatch);
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
    , updateTask, getPriorities, getStatuses, getRegularities, getArchiveTask, getNowTask, getTaskCart
};

export default taskService