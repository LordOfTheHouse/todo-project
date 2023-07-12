import {Layout} from 'antd';
import React, {useEffect, useState} from 'react';
import {Authorization} from "../components/Authorization";
import {Registration} from "../components/Registration";
import AppMenu from "../components/AppMenu";
import Notes from "../components/Notes";
import {useSelector} from "react-redux";
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const TaskPage = () => {
    const user = useSelector((state) => state.user.user);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

    useEffect(() => {
        if(!user){
            setIsLoginModalVisible(true);
        }
    }, []);
    const handleLoginCancel = () => {
        setIsLoginModalVisible(false);
    };

    const handleRegisterCancel = () => {
        setIsRegisterModalVisible(false);
    };



    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider>
                <div className="demo-logo-vertical"/>
                <AppMenu setIsLoginModalVisible={setIsLoginModalVisible}
                         setIsRegisterModalVisible={setIsRegisterModalVisible}/>
            </Sider>

            <Layout>
                <Content>
                    {user && <Notes/>}
                </Content>
            </Layout>
            <Authorization setRegistrationVisible={setIsRegisterModalVisible} isLoginModalVisible={isLoginModalVisible} handleLoginCancel={handleLoginCancel}/>
            <Registration handleRegisterCancel={handleRegisterCancel}
                          isRegisterModalVisible={isRegisterModalVisible}/>

        </Layout>
    );
};

export default TaskPage;