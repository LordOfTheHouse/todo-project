import React, { useState } from 'react';
import {Button, Input, Form, Modal, message} from 'antd';
import authService from "../services/authService";
import {login} from "../slices/userSlice";
import categoryService from "../services/categoryService";
import taskService from "../services/taskService";
import {useDispatch} from "react-redux";

export const Registration = ({ isRegisterModalVisible, handleRegisterCancel }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
            await authService.register(values);
            console.log("Привет от LordOfTheHouse, твоего верного помощника в выполнении дел!");
            console.log("Я здесь, чтобы помочь тебе организовывать задачи и достигать целей!");
            console.log("Если у тебя возникнут вопросы или нужна помощь, не стесняйся обратиться ко мне!");
            console.log("LordOfTheHouse@mail.ru");
            console.log("Удачи в достижении всех твоих целей!");

            await authService.login(values).then((user) => {
                dispatch(login(user));
                categoryService.getCategory(dispatch);
                taskService.getTasks(dispatch);
                },
                (error) => {
                message.error("Данные введены неверно");
                const _content = (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                        console.error(_content)
                    });
            handleRegisterCancel();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            visible={isRegisterModalVisible}
            footer={null}
            onCancel={handleRegisterCancel}
        >
            <Form form={form} onFinish={handleSubmit} style={{padding:"20px"}}>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        { required: true, message: 'Введите имя пользователя' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Введите email' },
                        { type: 'email', message: 'Неверный формат email' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, message: 'Введите пароль' }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Регистрация</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};