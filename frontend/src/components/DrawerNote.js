import {Button, Card, DatePicker, Input, Select} from "antd";
import dayjs from "dayjs";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";


export const DrawerNote = ({selectedNote, setDrawerVisible}) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.category);
    const statuses = useSelector((state) => state.task.statuses);
    const regularities = useSelector((state) => state.task.regularities);
    const priorities = useSelector((state) => state.task.priorities);

    const [selectTitle, setSelectTitle] = useState(selectedNote.title);
    const [selectDescription, setSelectDescription] = useState(selectedNote.description);
    const [selectedStatus, setSelectedStatus] = useState(selectedNote.status);
    const [selectedPriority, setSelectedPriority] = useState(selectedNote.priority);
    const [selectedRegularity, setSelectedRegularity] = useState(selectedNote.regularity);
    const [selectedDate, setSelectedDate] = useState(selectedNote.dateNotify);
    const [selectedCategory, setSelectedCategory] = useState(selectedNote.croppedCategory.name);


    useEffect(() => {
        taskService.getPriorities(dispatch);
        taskService.getStatuses(dispatch);
        taskService.getRegularities(dispatch);
        console.log(selectedNote)
    }, []);

    const dateFormat = "YYYY-MM-DD HH:mm:ss";

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };
    const handlePriorityChange = (priority) => {
        setSelectedPriority(priority);
    };
    const handleRegularityChange = (regularity) => {
        setSelectedRegularity(regularity);
    };
    const handleDateChange = (date) => {
        if (date) {
            setSelectedDate(date.format("YYYY-MM-DD HH:mm:ss"));
        }
    };
    const handleDescription = (event) => {
        setSelectDescription(event.target.value);
    };
    const handleTitle = (event) => {
        console.log(event.target.value);
        setSelectTitle(event.target.value);
    };
    const handleSaveResults = () => {

        taskService.updateTask(dispatch, {
                id: selectedNote.id,
                title: selectTitle,
                description: selectDescription,
                dateNotify: selectedDate,
                status: statuses.filter(status => status.status === selectedStatus)[0],
                category: categories.filter(category => category.name === selectedCategory)[0],
                priority: priorities.filter(priority => priority.priority === selectedPriority)[0],
                regularity: regularities.filter(regularity => regularity.regularity === selectedRegularity)[0]
            }
        )
        setDrawerVisible(false);
    };
    const handleCloseDrawer = () => {
        setDrawerVisible(false);
    }
    const disabledDate = (current) => {
        const previousDay = dayjs().subtract(1, 'day');
        return current && current < previousDay.endOf('day');
    };

    return (<>
            <div style={{marginBottom: '10px'}}>
                <Card hoverable title="Заголовок и описание"
                      style={{
                          width: 300,
                          fontFamily: 'Arial',
                          fontSize: '14px',
                          marginBottom: '5px'
                      }}>
                    <Input onChange={handleTitle} value={selectTitle} style={{marginBottom: "10px"}}/>
                    <Input.TextArea
                        onChange={handleDescription}
                        value={(selectedNote.description) ? selectedNote.description : selectDescription}
                    />
                </Card>
            </div>
            <div style={{marginBottom: '10px'}}>
                <Card hoverable title="Дата и время напоминания"
                      style={{
                          width: 300,
                          fontFamily: 'Arial',
                          fontSize: '14px',
                          marginBottom: '5px',

                      }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {selectedDate ? (
                            <DatePicker
                                format={dateFormat}
                                defaultValue={dayjs(selectedDate, dateFormat)}
                                disabledDate={disabledDate}
                                onChange={handleDateChange}
                                showTime={{defaultValue: dayjs('00:00:00', 'HH:mm:ss')}}
                            />
                        ) : (
                            <DatePicker
                                format={dateFormat}
                                disabledDate={disabledDate}
                                onChange={handleDateChange}
                                showTime={{defaultValue: dayjs('00:00:00', 'HH:mm:ss')}}
                            />
                        )}
                    </div>
                </Card>
            </div>
            <div style={{marginBottom: '10px'}}>
                <Card hoverable title="Характеристики"
                      style={{
                          width: 300,
                          fontFamily: 'Arial',
                          fontSize: '14px',
                          marginBottom: '5px',

                      }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Select
                            value={selectedCategory}
                            style={{
                                width: '200px',
                                height: '35px',
                                fontFamily: 'Arial',
                                fontSize: '14px'
                            }}
                            onChange={handleCategoryChange}
                            options={categories.map((category) => ({value: category.name, title: category.id}))}
                        />
                        <Select
                            value={selectedStatus}
                            style={{
                                width: '200px',
                                height: '35px',
                                fontFamily: 'Arial',
                                fontSize: '14px'
                            }}
                            onChange={handleStatusChange}
                            options={statuses.map((status) => ({value: status.status, title: status.id}))}
                        />
                        <Select
                            value={selectedPriority}
                            style={{
                                width: '200px',
                                height: '35px',
                                fontFamily: 'Arial',
                                fontSize: '14px'
                            }}
                            onChange={handlePriorityChange}
                            options={priorities.map((priority) => ({value: priority.priority, title: priority.id}))}
                        />
                        <Select
                            value={selectedRegularity}
                            style={{
                                width: '200px',
                                height: '35px',
                                fontFamily: 'Arial',
                                fontSize: '14px'
                            }}
                            onChange={handleRegularityChange}
                            options={regularities.map((regularity) => ({
                                value: regularity.regularity,
                                title: regularity.id
                            }))}
                        />
                    </div>
                </Card>
            </div>
            <div>
                <Card
                    hoverable
                    style={{
                        width: 300,
                        fontFamily: 'Arial',
                        fontSize: '14px',
                        marginBottom: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button type="primary" onClick={handleSaveResults} style={{marginRight: "5px", width: '100px'}}>
                        Сохранить
                    </Button>
                    <Button type="primary" danger onClick={handleCloseDrawer}
                            style={{marginLeft: "5px", width: '100px'}}>
                        Отменить
                    </Button>
                </Card>
            </div>
        </>
    );
}