import {Modal, Form, Input, Button, message} from 'antd';
import authService from "../services/authService";
import {login} from "../slices/userSlice";
import {useDispatch} from "react-redux";
export const Authorization = ({isLoginModalVisible, handleLoginOk, handleLoginCancel}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
            await authService.login(values).then((user) => {
                    console.log(user)
                    dispatch(login(user))
                },
                (error) => {
                    message.error("Данные введены неверно");
                    const _content = (error.response && error.response.data) ||
                        error.message ||
                        error.toString();

                    console.error(_content)
                });
            handleLoginOk();
            console.log(values);
        } catch (error) {
            message.error("Неправильный логин или пароль");
        }
    };
    return (
        <>
            <Modal title="Авторизация" visible={isLoginModalVisible} onOk={handleLoginOk} onCancel={handleLoginCancel}>
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item label="username" name="username" rules={[{ required: true, message: 'Введите имя пользователя' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Вход
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
