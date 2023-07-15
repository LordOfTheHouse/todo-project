import React, {useEffect, useState} from 'react';
import {Radio, Table, Drawer, Input, Tag, Button, Tooltip, Space} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import taskService from '../services/taskService';
import {DrawerNote} from "./DrawerNote";
import {CloseCircleOutlined, PlusCircleOutlined, SearchOutlined} from "@ant-design/icons";
import {ChainAnimation} from "./ChainAnimation";
import {useSpring, animated} from "react-spring";
import {LeftChainAnimation} from "./LeftChainAnimation";

const {Search} = Input;

const Notes = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);
    const curCategory = useSelector((state) => state.category.curCategory);
    const cart = useSelector((state) => state.category.cart);
    const categories = useSelector((state) => state.category.category);
    const statuses = useSelector((state) => state.task.statuses);
    const regularities = useSelector((state) => state.task.regularities);
    const priorities = useSelector((state) => state.task.priorities);
    const [newNote, setNewNote] = useState('');
    const [searchNote, setSearchNote] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false); // Состояние видимости Drawer
    const [selectedTask, setSelectedTask] = useState(null);
    const [filterTask, setFilteredTasks] = useState(tasks);


    const columns = [

        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
            render: (text, value) => (
                <Tooltip title={value.description}>
                    {text}
                </Tooltip>
            ),
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Complete',
            dataIndex: 'complete',
            key: 'complete',
            width: "10%",
            render: (text, task) => (<>
                    {task.status !== "COMPLETED" ?<div style={{textAlign:"center"}}> <Radio onClick={(e) => {
                        taskService.updateTask(dispatch, {
                            id: task.id,
                            title: task.title,
                            description: task.description,
                            dateNotify: task.dateNotify,
                            category: task.croppedCategory,
                            priority: priorities.filter(priority => priority.priority === task.priority)[0],
                            regularity: regularities.filter(regularity => regularity.regularity === task.regularity)[0],
                            status: statuses.filter(status => status.status === "COMPLETED")[0]
                        }, curCategory)
                        e.stopPropagation();
                    }}/> </div>:<div style={{textAlign:"center"}}> <Radio defaultChecked={true} onClick={(e)=>{e.stopPropagation()}}/></div>}
                </>
            ),
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
                    <div style={{textAlign: 'right'}}>
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
                    <div style={{textAlign: 'right'}}>
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
            title: 'Date/Time',
            dataIndex: 'date_time',
            key: 'date_time',
            render: (text, task) => <div style={{textAlign: 'right'}}>{task.dateNotify}</div>,
            sorter: (a, b) => new Date(a.dateNotify) - new Date(b.dateNotify),
        },
        {
            title: 'Regularity',
            dataIndex: 'regularity',
            key: 'regularity',
            render: (text) => {
                let regularityText = '';
                let colorText = ''
                switch (text) {
                    case 'DAILY':
                        regularityText = 'Daily';
                        colorText = "#f2771f";
                        break;
                    case 'EVERY_OTHER_DAY':
                        regularityText = 'Every Other Day';
                        colorText = "#ebd513";
                        break;
                    case 'WEEKLY':
                        regularityText = 'Weekly';
                        colorText = "#98eb13";
                        break;
                    case 'BIWEEKLY':
                        colorText = "#13eb37";
                        regularityText = 'Biweekly';
                        break;
                    case 'MONTHLY':
                        colorText = "#13ebaa";
                        regularityText = 'Monthly';
                        break;
                    case 'QUARTERLY':
                        colorText = "#139beb";
                        regularityText = 'Quarterly';
                        break;
                    default:
                        regularityText = 'None';
                        break;
                }

                return (<div style={{
                    textAlign: 'right',
                    color:{colorText}}}>
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
            render: (name, task) => (
                <CloseCircleOutlined style={{color: 'red'}}
                                     onClick={(e) => {
                                         if(curCategory === -5){
                                             taskService.deleteTask(dispatch, task, curCategory);
                                         } else {
                                             console.log(cart)
                                             const newTask = {
                                                 id: task.id,
                                                 title: task.title,
                                                 description: task.description,
                                                 dateNotify: task.dateNotify,
                                                 status: statuses.filter(status => status.status === task.status)[0],
                                                 category: cart,
                                                 priority: priorities.filter(priority => priority.priority === task.priority)[0],
                                                 regularity: regularities.filter(regularity => regularity.regularity === task.regularity)[0]
                                             }
                                             taskService.updateTask(dispatch, newTask, curCategory);
                                         }

                                         e.stopPropagation();
                                     }}/>
            ),
        },


    ];


    useEffect(() => {
        const filtered = tasks.filter(tasks => tasks.title.toLowerCase().includes(searchNote.toLowerCase()))
        setFilteredTasks(filtered);
    }, [searchNote, tasks]);

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

    const handleSearchChange = (e) => {
        if (e && e.target && e.target.value) {
            setSearchNote(e.target.value);
        } else {
            setSearchNote('');
        }
    };

    const handleAddNote = () => {
        taskService.createTask(dispatch, {
            title: newNote,
            description: "",
            category: {id: curCategory}
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

    const handleDeleteAll = () => {
        if(curCategory === -5){
            tasks.forEach(task => taskService.deleteTask(dispatch, task, curCategory));
        } else{
            tasks.forEach(task => {
                const newTask = {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    dateNotify: task.dateNotify,
                    status: statuses.filter(status => status.status === task.status)[0],
                    category: cart,
                    priority: priorities.filter(priority => priority.priority === task.priority)[0],
                    regularity: regularities.filter(regularity => regularity.regularity === task.regularity)[0]
                }
                taskService.updateTask(dispatch, newTask, curCategory);
            });
        }


    };

    const handleArchiveAll = () => {
        const archive = categories.filter(category => category.name === 'Архив')[0];
        tasks.forEach(task => {
            const newTask = {
                id: task.id,
                title: task.title,
                description: task.description,
                dateNotify: task.dateNotify,
                status: statuses.filter(status => status.status === task.status)[0],
                category: archive,
                priority: priorities.filter(priority => priority.priority === task.priority)[0],
                regularity: regularities.filter(regularity => regularity.regularity === task.regularity)[0]
            }
            taskService.updateTask(dispatch, newTask, curCategory);
        });
    };
    const [showSearch, setShowSearch] = useState(false);
    const [springProps, setSpringProps] = useSpring(() => ({
        opacity: 0,
        width: 0,
    }));


    const toggleSearch = () => {
        setShowSearch(!showSearch);

        setSpringProps({
            opacity: showSearch ? 0 : 1,
            width: showSearch ? 0 : 200,
        });
    };

    return (
        <div style={{padding: '80px 125px'}}>
            {categories.filter(category => category.id === curCategory && category.name === "гача")[0] &&<> <ChainAnimation bot={"0px"} rig={"-20px"}/> <LeftChainAnimation bot={"0px"} lef={"180px"}/></>}

            {curCategory>=0 && <Search allowClear enterButton={
                <Button icon={<PlusCircleOutlined style={{color: "blue"}}/>}/>}
                    value={newNote} onSearch={handleAddNote} onChange={handleInputChange}
                    style={{marginBottom: "20px"}}/>}
            <div style={{marginBottom: "10px"}}>
                <Space>
                    <SearchOutlined onClick={toggleSearch} style={{color:"white"}}/>

                    <animated.div style={{ ...springProps, overflow: "hidden" }}>
                        <Input.Search
                            placeholder="Поиск"
                            value={searchNote} onChange={handleSearchChange}
                        />
                    </animated.div>
                </Space>
            </div>
            <Table columns={columns} dataSource={filterTask} rowKey="id"
                   onRow={(record) => ({
                       onClick: () => {
                           handleRowClick(record);
                       },

                   })}

                   expandable={{
                       expandedRowRender: (record) => (
                           <p
                               style={{
                                   margin: 0,
                               }}
                           >
                               {record.description}
                           </p>
                       ),
                       rowExpandable: (record) => record.title !== 'Not Expandable',
                   }}
            />
            <div
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    display: "flex",
                    flexDirection: "row-reverse",
                }}
            >
                <Button type="primary" danger onClick={handleDeleteAll}>
                    Delete All
                </Button>
                <Button style={{marginRight: "10px"}} type="primary" onClick={handleArchiveAll}>
                    Archive All
                </Button>
            </div>
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