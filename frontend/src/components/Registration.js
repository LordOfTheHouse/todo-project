import React, { useState } from 'react';
import { Button, Input, Form, Modal } from 'antd';
import authService from "../services/authService";

export const Registration = ({ isRegisterModalVisible, handleRegisterOk, handleRegisterCancel }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            await authService.register(values);
            handleRegisterOk();
            console.log(values);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            visible={isRegisterModalVisible}
            onOk={handleRegisterOk}
            onCancel={handleRegisterCancel}
        >
            <Form form={form} onFinish={handleSubmit}>
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