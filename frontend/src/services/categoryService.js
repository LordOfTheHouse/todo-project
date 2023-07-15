import axios from "axios";
import {set} from "../slices/categorySlice";
import authHeader from "./authHeader";
import {message} from "antd";


const getCategory = (dispatch) => {
    return axios.get('/category/all', { headers: authHeader() }).then(
        (response) => {
            dispatch(set(response.data));
            console.log(response.data)
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
    return axios.post("/category", category,  {headers: authHeader()}).then(
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
    return axios.put('/category', category, {headers: authHeader()}).then(
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

const deleteCategory = (dispatch, idCategory) => {
    return axios.delete("/category" + `/${idCategory}`, {headers: authHeader()}).then(
        (response) => {
            getCategory(dispatch)
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            console.error(_content);
            message.error("Категория должна быть пустой");
        });
};

const categoryService = {
    createCategory, updateCategory, deleteCategory, getCategory
};

export default categoryService