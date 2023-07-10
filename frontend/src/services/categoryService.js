import axios from "axios";
import {set} from "../slices/categorySlice";
import authHeader from "./authHeader";
import {API_URL} from "./API_URL";
import {message} from "antd";

const API_URL_CATEGORY = API_URL + "category"

const getCategory = (dispatch) => {
    return axios.get(API_URL_CATEGORY+'/all', {headers: authHeader()}).then(
        (response) => {
            dispatch(set(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            message.error(_content)
            dispatch(set([]));
        });
};

export const createCategory = ( dispatch, category) => {
    return axios.post(API_URL_CATEGORY, category,  {headers: authHeader()}).then(
        (response) => {
            getCategory(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content);
            message.error("недостаточно прав доступа");
        });
};

const updateCategory = (dispatch, category) => {
    return axios.put(API_URL_CATEGORY, category, {headers: authHeader()}).then(
        (response) => {
            getCategory(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content);
            message.error("недостаточно прав доступа");
        });
};

const deleteCategory = (dispatch, category) => {
    return axios.delete(API_URL_CATEGORY + `/${category.id}`, {headers: authHeader()}).then(
        (response) => {
            getCategory(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content);
            message.error("недостаточно прав доступа");
        });
};

const categoryService = {
    createCategory, updateCategory, deleteCategory, getCategory
};

export default categoryService