import {Layout, Menu, Input, Table, Drawer, Button, DatePicker, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {Authorization} from "./components/Authorization";
import {Registration} from "./components/Registration";
import {useDispatch, useSelector} from "react-redux";
import categoryService from "./services/categoryService";
import taskService from "./services/taskService";
import {
    PlusOutlined,
} from '@ant-design/icons';
import AppMenu from "./components/AppMenu";
import dayjs from "dayjs";
import igor from "./img/igor.jpg"

const {RangePicker} = DatePicker;

const {Header, Content, Footer, Sider} = Layout;

const {Search} = Input;

const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

const App = () => {
    const dispatch = useDispatch();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [selectedNote, setSelectedNote] = useState({title: "kek"});

    const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                width: '40%',
                sorter: (a, b) => a.title.localeCompare(b.title)
            }
        ]
    ;

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };
    const disabledDateTime = () => ({
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    });

    const handleRowClick = (record) => {
        setSelectedNote(record);
        setDrawerVisible(true);
    };

    const handleCloseDrawer = () => {
        setDrawerVisible(false);
    };

    const handleDrawerSave = (values) => {
        // Обработка сохранения изменений заметки
        console.log(values);
        setDrawerVisible(false);
    };

    const handleLoginOk = () => {
        setIsLoginModalVisible(false);
    };

    const handleLoginCancel = () => {
        setIsLoginModalVisible(false);
    };

    const handleRegisterOk = () => {
        setIsRegisterModalVisible(false);
    };

    const handleRegisterCancel = () => {
        setIsRegisterModalVisible(false);
    };

    const handleInputChange = (e) => {
        if(e && e.target && e.target.value){
            setNewNote(e.target.value);
        } else {
            setNewNote("");
        }
    };

    const handleAddNote = () => {
        const newNoteObj = {
            id: 1,
            title: newNote,
            datetime: "2020-12-12 12:12:12",
            description: "kek",
            priority: "Высокий",
            status: "В процессе",
            regularity: "Нет",
            category: "full"

        };
        setNotes([newNoteObj, ...notes]);
        setNewNote('');
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
                    <div style={{padding: 24, background: '#fff'}}>
                        <Search
                            placeholder="Enter a new note"
                            value={newNote}
                            onChange={handleInputChange}
                            enterButton={<PlusOutlined/>}
                            size="large"
                            onSearch={handleAddNote}
                        />
                        <Table
                            style={{padding:"20px 0"}}
                            columns={columns}
                            dataSource={notes}
                            rowKey={(record) => record.title}
                            pagination={false}
                            bordered={true}
                            onRow={(record, rowIndex) => ({
                                onClick: () => handleRowClick(record),
                            })}
                        />
                    </div>
                </Content>
            </Layout>
            <Authorization isLoginModalVisible={isLoginModalVisible} handleLoginCancel={handleLoginCancel}
                           handleLoginOk={handleLoginOk}/>
            <Registration handleRegisterCancel={handleRegisterCancel} handleRegisterOk={handleRegisterOk}
                          isRegisterModalVisible={isRegisterModalVisible}/>
            <Drawer

                title="Note Details"
                visible={drawerVisible}
                onClose={handleCloseDrawer}
                theme="dark"
                footer={
                    <div style={{textAlign: "right"}}>
                        <Button onClick={handleCloseDrawer} style={{marginRight: 8}}>
                            Выход
                        </Button>
                        <Button onClick={() => handleDrawerSave(selectedNote)} type="primary">
                            Сохранить
                        </Button>
                    </div>
                }
            >
                <div>
                    <label>Title:</label>
                    <Input value={selectedNote.title} onChange={(e) => handleInputChange("title", e.target.value)}/>
                </div>
                <div>
                    <label>Описание:</label>
                    <Input.TextArea value={selectedNote.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}/>
                </div>
                <div>
                    <label>Дата и время:</label>
                    <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDate}
                        disabledTime={disabledDateTime}
                        showTime={{defaultValue: dayjs('00:00:00', 'HH:mm:ss')}}
                    />
                </div>
                <div>
                    <label>Статус:</label>
                    <Select value={selectedNote.status}
                            onChange={(value) => handleInputChange("status", value)}
                            options={[{
                                value: "pending",
                                label: "Ожидание"
                            },
                                {
                                    value: "in_progress",
                                    label: "В процессе"
                                },
                                {
                                    value: "complete",
                                    label: "Завершено"
                                },
                            ]}>
                    </Select>
                </div>
                <div>
                    <label>Категория:</label>
                    <Input value={selectedNote.category}
                           onChange={(e) => handleInputChange("category", e.target.value)}/>
                </div>
                <div>
                    <label>Приоритет:</label>
                    <Select value={selectedNote.priority}
                            onChange={(value) => handleInputChange("priority", value)}
                            options={[{
                                value: "low",
                                label: "Низкий"
                            },
                                {
                                    value: "medium",
                                    label: "Средний"
                                },
                                {
                                    value: "high",
                                    label: "Высокий"
                                },
                            ]}>
                    </Select>
                </div>
                <div>
                    <label>Регулярность:</label>
                    <Input value={selectedNote.regularity}
                           onChange={(e) => handleInputChange("regularity", e.target.value)}/>
                </div>
                <div align="center">
                    {selectedNote.title.toLowerCase() === "игорь" && <img src={igor} alt="Изображение товара" style={{ maxWidth: '100%', margin: '0 auto', padding:"20px 0" }}/>}
                </div>
            </Drawer>
        </Layout>
    );
};

export default App;