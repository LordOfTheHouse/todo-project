import React, {useEffect, useState} from 'react';
import {Menu, Input, Form, Modal, Card} from 'antd';
import {
    FolderOutlined,
    LogoutOutlined,
    UserOutlined,
    UserAddOutlined,
    PlusOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    DiffOutlined,
    BulbOutlined,
    InboxOutlined, DeleteOutlined
} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import categoryService from "../services/categoryService";
import taskService from "../services/taskService";
import authService from "../services/authService";
import {logout} from "../slices/userSlice";
import SubMenu from "antd/es/menu/SubMenu";
import {categorySlice, setCategory} from "../slices/categorySlice";
import {ChainAnimation} from "./ChainAnimation";

const AppMenu = ({setIsLoginModalVisible, setIsRegisterModalVisible}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const curCategory = useSelector((state) => state.category.curCategory);
    const cart = useSelector((state) => state.category.cart);
    const categories = useSelector((state) => state.category.category);
    const tasks = useSelector((state) => state.task.tasks);
    const statuses = useSelector((state) => state.task.statuses);
    const regularities = useSelector((state) => state.task.regularities);
    const priorities = useSelector((state) => state.task.priorities);
    const [newCategory, setNewCategory] = useState("");
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");
    const [form] = Form.useForm();


    useEffect(() => {
        if (user) {
            categoryService.getCategory(dispatch);
        }
    }, []);

    const handleMenuClick = (e) => {
        if (e.key === "1") {
            setIsLoginModalVisible(true);
        } else if (e.key === '2') {
            setIsRegisterModalVisible(true);
        } else if (e.key === '3') {
            dispatch(logout());
            authService.logout();
        } else if (e.key === "4") {
            dispatch(setCategory(-1))
            taskService.getTasks(dispatch);
        } else if (e.key === "5") {
            dispatch(setCategory(-2))
            taskService.getNowTask(dispatch);
        } else if (e.key === "6") {
            dispatch(setCategory(-3))
            taskService.getTaskNotify(dispatch);
        } else if (e.key === "7") {
            dispatch(setCategory(-4))
            taskService.getArchiveTask(dispatch);
        } else if (e.key === "8") {
            dispatch(setCategory(-5))
            taskService.getTaskCart(dispatch);
        }
    };

    const handleAddCategory = () => {
        if (newCategory) {
            categoryService.createCategory(dispatch, {"category": newCategory});
            setNewCategory('');
        }
    };

    const handleMenuItemClick = (category) => {
        dispatch(setCategory(category.id));
        taskService.getTasksByCategory(dispatch, category.id);
        console.log(`Кликнули на категорию: ${category.name}`);
    };
    const handleEditCategory = () => {
        if (editCategoryName && editCategoryId) {
            console.log(editCategoryId);
            categoryService.updateCategory(dispatch, {id: editCategoryId, category: editCategoryName});
            setEditCategoryId(null);
            setEditCategoryName("");
            setIsEditModalVisible(false);
            form.resetFields();
        }
    };

    const handleCancelEditModal = () => {
        setIsEditModalVisible(false);
        form.resetFields();
    };

    const handleDeleteCategory = (category) => {
        categoryService.deleteCategory(dispatch, category.id);
        }


    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            defaultOpenKeys={['4']}
            onClick={handleMenuClick}>
            {!user ? (
                <>
                    <Menu.Item key="1" icon={<UserOutlined/>}>Вход</Menu.Item>
                    <Menu.Item key="2" icon={<UserAddOutlined/>}>Регистрация</Menu.Item>
                </>
            ) : (
                <>
                    <>
                        <Menu.Item key="3" icon={<LogoutOutlined/>}>
                            {user && user.username}
                        </Menu.Item>
                    </>
                    <>
                        <Menu.Item key="4" icon={<InboxOutlined/>}>
                            Все заметки
                        </Menu.Item>
                    </>
                    <>
                        <Menu.Item key="5" icon={<ClockCircleOutlined/>}>
                            Мой день
                        </Menu.Item>
                    </>
                    <>
                        <Menu.Item key="6" icon={<BulbOutlined/>}>
                            Уведомления
                        </Menu.Item>
                    </>
                    <>
                        <Menu.Item key="7" icon={<DiffOutlined/>}>
                            Архив
                        </Menu.Item>
                    </>
                    <>
                        <Menu.Item key="8" icon={<DeleteOutlined />}>
                            Корзина
                        </Menu.Item>
                    </>
                </>
            )}
            <SubMenu key="sub1" icon={<FolderOutlined/>} title="Категории">
                {user && categories.filter(category => !(category.name === "Архив" || category.name === "Корзина")).map((category, index) => (
                    <Menu.Item key={`category-${index}`} onClick={() => handleMenuItemClick(category)}
                               onDoubleClick={() => {
                                   setEditCategoryId(category.id);
                                   setEditCategoryName(category.name);
                                   setIsEditModalVisible(true);

                               }}
                    >
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            {category.name}
                            <span><CloseCircleOutlined
                                style={{color: 'white'}}
                                onClick={(e) => {
                                    handleDeleteCategory(category);
                                    e.stopPropagation();
                                }}
                            />
                            </span>
                        </div>
                    </Menu.Item>
                ))}
                <Card hoverable style={{
                    fontFamily: 'Arial',
                    fontSize: '14px',
                    marginBottom: '5px',
                    background: '#001529',
                    color: '#FFFFFF',
                    border: '1px solid #0d1137'
                }} >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <PlusOutlined
                            style={{color: 'white', marginBottom: "10px", fontSize: "18px"}}
                            onClick={handleAddCategory}
                        />
                        <Input className="text-field" placeholder="Добавить категорию"
                               enterButton icon={<PlusOutlined/>}
                               value={newCategory}
                               onChange={(e) => setNewCategory(e.target.value)}
                               onKeyPress={e => e.key === 'Enter' && handleAddCategory()}
                               theme="dark"/>
                    </div>
                </Card>
            </SubMenu>

<Modal
    title="Редактировать категорию"
    visible={isEditModalVisible}
    onOk={handleEditCategory}
    onCancel={handleCancelEditModal}
    destroyOnClose
>
    <Form form={form}>
        <Form.Item
            label="Название категории"
            name="category"
            initialValue={editCategoryName}
            rules={[{required: true, message: 'Введите название категории'}]}
        >
            <Input onChange={(e) => setEditCategoryName(e.target.value)}/>
        </Form.Item>
    </Form>
</Modal>
</Menu>

)
;
}
;

export default AppMenu;