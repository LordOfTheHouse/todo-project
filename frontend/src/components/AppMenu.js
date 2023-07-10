import React, {useEffect, useState} from 'react';
import {Menu, Input} from 'antd';
import {
    FolderOutlined,
    LogoutOutlined,
    UserOutlined,
    UserAddOutlined,
    PlusOutlined
} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import categoryService from "../services/categoryService";
import taskService from "../services/taskService";
import authService from "../services/authService";
import {logout} from "../slices/userSlice";
import SubMenu from "antd/es/menu/SubMenu";

const AppMenu = ({setIsLoginModalVisible, setIsRegisterModalVisible}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const categories = useSelector((state) => state.category.category);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        categoryService.getCategory(dispatch);
        taskService.getTasks(dispatch);
    }, []);

    const handleMenuClick = (e) => {
        if (e.key === "1") {
            setIsLoginModalVisible(true);
        } else if (e.key === '2') {
            setIsRegisterModalVisible(true);
        } else if (e.key === '3') {
            authService.logout();
            dispatch(logout());
        }
    };

    const handleAddCategory = () => {
        if (newCategory) {
            categoryService.createCategory({"category": newCategory});
            setNewCategory('');
        }
    };

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['1']}
            onClick={handleMenuClick}>
            {user === null ? (
                <>
                    <Menu.Item key="1" icon={<UserOutlined/>}>Авторизация</Menu.Item>
                    <Menu.Item key="2" icon={<UserAddOutlined/>}>Регистрация</Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item key="3" icon={<LogoutOutlined/>}>
                        {user && user.username}
                    </Menu.Item>
                </>
            )}
            <SubMenu key="sub1" icon={<FolderOutlined/>} title="Категории">
                {categories.map((category, index) => (
                    <Menu.Item key={`category-${index}`}>{category}</Menu.Item>
                ))}
            </SubMenu>
            <div className="text-field-container" style={{position: 'fixed', bottom: 10, left: 7}}>
                <Input className="text-field" placeholder="Добавить категорию"
                       enterButton={<PlusOutlined/>}
                       value={newCategory}
                       onChange={(e) => setNewCategory(e.target.value)}
                       onKeyPress={e => e.key === 'Enter' && handleAddCategory()}
                       theme="dark"/>
            </div>
        </Menu>
    );
};

export default AppMenu;