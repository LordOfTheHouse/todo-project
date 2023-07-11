import {Modal, Form, Input, Button, message} from 'antd';
import authService from "../services/authService";
import {login} from "../slices/userSlice";
import {useDispatch} from "react-redux";
import categoryService from "../services/categoryService";
import taskService from "../services/taskService";
export const Authorization = ({isLoginModalVisible, handleLoginCancel}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        try {
            await authService.login(values).then((user) => {
                    console.log(user);
                    handleLoginCancel();
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
            console.log(values);
        } catch (error) {
        }
    };
    return (
        <>
            <Modal title="Авторизация" visible={isLoginModalVisible} footer={null} onCancel={handleLoginCancel}>
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
