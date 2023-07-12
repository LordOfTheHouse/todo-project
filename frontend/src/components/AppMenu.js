import React, {useEffect, useState} from 'react';
import {Menu, Input, Form, Modal} from 'antd';
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
    InboxOutlined
} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import categoryService from "../services/categoryService";
import taskService from "../services/taskService";
import authService from "../services/authService";
import {logout} from "../slices/userSlice";
import SubMenu from "antd/es/menu/SubMenu";
import {setCategory} from "../slices/categorySlice";

const AppMenu = ({setIsLoginModalVisible, setIsRegisterModalVisible}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const categories = useSelector((state) => state.category.category);
    const [newCategory, setNewCategory] = useState("");
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");
    const [form] = Form.useForm();
    const [filterCategory, setFilteredCategory] = useState(categories);


    useEffect(() => {
        const filtered = categories.filter(category => category.name.toLowerCase().includes(newCategory.toLowerCase()))
        setFilteredCategory(filtered);
    }, [newCategory, categories]);

    useEffect(() => {
        if(user){
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
        }else if (e.key === "4") {
            taskService.getTasks(dispatch);
        } else if (e.key === "5") {
            taskService.getNowTask(dispatch);
        } else if (e.key === "6") {
            taskService.getTaskNotify(dispatch);
        } else if (e.key === "7") {
            taskService.getArchiveTask(dispatch);
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
        console.log(category.id)
        categoryService.deleteCategory(dispatch, category.id);
    };

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            defaultOpenKeys={['4']}
            onClick={handleMenuClick}>
            {!user ? (
                <>
                    <Menu.Item key="1" icon={<UserOutlined/>}>Авторизация</Menu.Item>
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
                        <Menu.Item key="4" icon={<InboxOutlined />}>
                            Все заметки
                        </Menu.Item>
                    </>
                    <>
                        <Menu.Item key="5" icon={<ClockCircleOutlined />}>
                                    Мой день
                        </Menu.Item>
                    </>
                    <>
                        <Menu.Item key="6" icon={<BulbOutlined />}>
                            Уведомления
                        </Menu.Item>
                    </>
                    <>
                        <Menu.Item key="7" icon={<DiffOutlined />}>
                            Архив
                        </Menu.Item>
                    </>
                </>
            )}
            <SubMenu key="sub1" icon={<FolderOutlined/>}  title="Категории">
                {user && filterCategory.filter(category=> category.name!=="Архив").map((category, index) => (
                    <Menu.Item key={`category-${index}`} onClick={() => handleMenuItemClick(category)}
                               onDoubleClick={() => {
                                   setEditCategoryId(category.id);
                                   setEditCategoryName(category.name);
                                   setIsEditModalVisible(true);

                               }}
                    ><div  style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {category.name}
                        <span><CloseCircleOutlined
                                style={{color: 'white'}}
                                 onClick={() => handleDeleteCategory(category)}
                            />
                            </span>
                        </div>
                    </Menu.Item>
                ))}
            </SubMenu>
            {user && <div className="text-field-container" style={{position: 'fixed', bottom: 10, left: 7}}>
                <Input className="text-field" placeholder="Добавить категорию"
                       enterButton={<PlusOutlined/>}
                       value={newCategory}
                       onChange={(e) => setNewCategory(e.target.value)}
                       onKeyPress={e => e.key === 'Enter' && handleAddCategory()}
                       theme="dark"/>
            </div>}
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

    );
};

export default AppMenu;