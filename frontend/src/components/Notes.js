import React, { useEffect, useState } from 'react';
import {Table, Drawer, Input, Tag, Button, Tooltip} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import taskService from '../services/taskService';
import { DrawerNote } from "./DrawerNote";
import {CloseCircleOutlined, PlusCircleOutlined, PlusOutlined} from "@ant-design/icons";


const { Search } = Input;

const Notes = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);
    const curCategory = useSelector((state) => state.category.curCategory);
    const [newNote, setNewNote] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false); // Состояние видимости Drawer
    const [selectedTask, setSelectedTask] = useState(null);
    const [filterTask, setFilteredTasks] = useState(tasks);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '40%',
            render: (text, value) => (
                <Tooltip title={value.description}>
                    {text}
                </Tooltip>
            ),
            sorter: (a, b) => a.title.localeCompare(b.title),
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {

                let color = '';
                let statusText = '';

                switch (text) {
                    case 'NONE':
                        color = 'black';
                        statusText = 'None';
                        break;
                    case 'IN_PROGRESS':
                        color = 'blue';
                        statusText = 'In Progress';
                        break;
                    case 'ON_HOLD':
                        color = 'yellow';
                        statusText = 'On Hold';
                        break;
                    case 'COMPLETED':
                        color = 'green';
                        statusText = 'Completed';
                        break;
                    default:
                        color = 'black';
                        statusText = 'None';
                        break;
                }

                return (
                        <div style={{ textAlign: 'right' }}>
                            <Tag color={color}>{statusText}</Tag>
                        </div>
                );
            },
            sorter: (a, b) => {
                const sortOrder = ['COMPLETED', 'IN_PROGRESS', 'ON_HOLD', 'NONE'];
                const indexA = sortOrder.indexOf(a.status.toUpperCase());
                const indexB = sortOrder.indexOf(b.status.toUpperCase());
                return indexA - indexB;
            }
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (text) => {
                let color = '';
                let priorityText = '';

                switch (text) {
                    case 'CRITICAL':
                        color = 'red';
                        priorityText = 'Critical';
                        break;
                    case 'URGENT':
                        color = 'orange';
                        priorityText = 'Urgent';
                        break;
                    case 'HIGH':
                        color = 'volcano';
                        priorityText = 'High';
                        break;
                    case 'MEDIUM':
                        color = 'gold';
                        priorityText = 'Medium';
                        break;
                    case 'LOW':
                        color = 'lime';
                        priorityText = 'Low';
                        break;
                    case 'NONE':
                        color = 'gray';
                        priorityText = 'None';
                        break;
                    default:
                        color = 'gray';
                        priorityText = 'None';
                        break;
                }

                return (
                    <div style={{ textAlign: 'right' }}>
                        <Tag color={color}>{priorityText}</Tag>
                    </div>
                );
            },
            sorter: (a, b) => {
                const sortOrder = ['CRITICAL', 'URGENT', 'HIGH', 'MEDIUM', 'LOW', 'NONE'];
                const indexA = sortOrder.indexOf(a.priority.toUpperCase());
                const indexB = sortOrder.indexOf(b.priority.toUpperCase());
                return indexA - indexB;
            }
        },
        {
            title: 'Regularity',
            dataIndex: 'regularity',
            key: 'regularity',
            render: (text) => {
                let regularityText = '';

                switch (text) {
                    case 'DAILY':
                        regularityText = 'Daily';
                        break;
                    case 'EVERY_OTHER_DAY':
                        regularityText = 'Every Other Day';
                        break;
                    case 'WEEKLY':
                        regularityText = 'Weekly';
                        break;
                    case 'BIWEEKLY':
                        regularityText = 'Biweekly';
                        break;
                    case 'MONTHLY':
                        regularityText = 'Monthly';
                        break;
                    case 'QUARTERLY':
                        regularityText = 'Quarterly';
                        break;
                    default:
                        regularityText = 'None';
                        break;
                }

                return (<div style={{ textAlign: 'right' }}>
                        {regularityText}
                </div>);
            },
            sorter: (a, b) => {
                const sortOrder = ['DAILY', 'EVERY_OTHER_DAY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'QUARTERLY'];
                const indexA = sortOrder.indexOf(a.regularity.toUpperCase());
                const indexB = sortOrder.indexOf(b.regularity.toUpperCase());
                return indexA - indexB;
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (name, value) => (
                <CloseCircleOutlined style={{ color: 'red' }}
                                     onClick={() => {
                                         taskService.deleteTask(dispatch, value);
                                         handleDrawerClose();
                                     }}/>
            ),
        },


    ];

    useEffect(() => {
        const filtered = tasks.filter(tasks => tasks.title.toLowerCase().includes(newNote.toLowerCase()))
        setFilteredTasks(filtered);
    }, [newNote, tasks]);

    useEffect(() => {
        taskService.getTasks(dispatch);
    }, []);

    const handleInputChange = (e) => {
        if (e && e.target && e.target.value) {

            setNewNote(e.target.value);
        } else {
            setNewNote('');
        }
    };

    const handleAddNote = () => {
        taskService.createTask(dispatch, {
            title: newNote,
            description:"",
            category: { id: curCategory }
        });
        setNewNote("");
    };

    const handleRowClick = (record) => {
        setSelectedTask(record);
        setDrawerVisible(true);
    };

    const handleDrawerClose = () => {
        setDrawerVisible(false);
        setSelectedTask(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Search allowClear enterButton={
                <Button icon={<PlusCircleOutlined style={{color:"blue"}}/> } />}
             value={newNote} onChange={handleInputChange} onSearch={handleAddNote} style={{marginBottom:"20px"}}/>
            <Table columns={columns} dataSource={filterTask} rowKey="id"
                   onRow={(record) => ({
                       onClick: () => {
                           handleRowClick(record);
                       },
                   })}
            />
            <Drawer
                title="Заметка"
                placement="right"
                visible={drawerVisible}
                onClose={handleDrawerClose}
            >
                {selectedTask && <DrawerNote selectedNote={selectedTask} setDrawerVisible={setDrawerVisible}/>}
            </Drawer>
        </div>
    );
};

export default Notes;