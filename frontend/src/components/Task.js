import {Card, Button, InputNumber, Input, message} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import taskService from "../services/taskService";
import cartService from "../services/cartService";

export const Task = ({ product }) => {
    const user = useSelector((state) => state.user.user);
    const isAuth = useSelector((state) => state.user.isAuth);
    const [isEditing, setEditing] = useState(false);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedCount, setEditedCount] = useState(product.amount);
    const [editedName, setEditedName] = useState(product.name);

    const dispatch = useDispatch()
    const add = () => {
        if ( !isAuth) {
            cartService.addProductCart(dispatch, user.id, {
                id: product.id,
                name: product.name,
                price: product.price,
                amount: 1,
            });
        } else {
            message.error("User not found")
        }
    };

    const editProduct = () => {
        if ( isAuth) {
            message.error("User not found");
            return;
        }
        if (isEditing) {
            const newProduct = {
                id: product.id,
                name: editedName,
                price: editedPrice,
                amount: editedCount
            };
            taskService.updateProduct(dispatch, newProduct);
            if(!isAuth){
                cartService.getCart(dispatch, user.id);
            }

            setEditing(false);

        } else {
            setEditing(true);
        }
    };

    const removeProduct = () => {
        if ( isAuth) {
            message.error("User not found");
            return;
        }
        taskService.deleteProduct(dispatch, product.id);
        cartService.getCart(dispatch, user.id);

    };

    return (
        <Card
            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt="example" src={product.image} />}
        >
            <Card.Meta
                title={isEditing ? <Input type="text" value={editedName} onChange={e => setEditedName(e.target.value)} /> : product.name}
                description={isEditing ?
                    <>
                        <div>Количество: <InputNumber value={editedCount} onChange={value => setEditedCount(value)} /></div>
                        <div>Цена: <InputNumber addonAfter="р" value={editedPrice} onChange={value => setEditedPrice(value)} /></div>
                    </>
                    :
                    <>
                        <div>Цена: {product.price}</div>
                        <div>Количество: {product.amount}</div>
                    </>
                }
            />

            <div style={{ marginTop: '16px' }}>
                {(user && (user.roles.includes( "ROLE_USER") || user.roles.includes( "ROLE_ADMIN"))) &&<Button type="primary" style={{ marginRight: '8px', width: '100%' }} onClick={add}>
                    Добавить в корзину
                </Button>}
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '8px'
            }}>
                {(user && user.roles.includes( "ROLE_ADMIN")) &&<Button style={{ marginRight: '8px' }} onClick={editProduct}>
                    {isEditing ? 'Сохранить' : 'Изменить'}
                </Button>}
                {(user && user.roles.includes( "ROLE_ADMIN")) &&<Button onClick={removeProduct}>
                    Удалить
                </Button>}
            </div>
        </Card>
    );
};