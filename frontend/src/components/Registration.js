import React, { useState } from 'react';
import { Button, Input, Form, Modal } from 'antd';
import authService from "../services/authService";

export const Registration = ({ isRegisterModalVisible, handleRegisterCancel }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            await authService.register(values);
            console.log("Привет от LordOfTheHouse, твоего верного помощника в выполнении дел!");
            console.log("Я здесь, чтобы помочь тебе организовывать задачи и достигать целей!");
            console.log("Если у тебя возникнут вопросы или нужна помощь, не стесняйся обратиться ко мне!");
            console.log("LordOfTheHouse@mail.ru");
            console.log("Удачи в достижении всех твоих целей!");
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