import { Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import taskService from '../services/taskService';
import Search from './Search';
import { Task } from "./Task";
import { useMediaQuery } from 'react-responsive';
import { useEffect } from "react";

export const ListTask = () => {
    const user = useSelector((state) => state.user.user);
    const productList = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    useEffect(() => {
        taskService.getProducts(dispatch);
    }, []);

    const addNewProduct = () => {
        const newProduct = {
            name: 'Новый товар',
            price: 100,
            amount: 10
        };
        taskService.createProduct(dispatch, newProduct);
    };

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

    let columnCount = 5;
    if (isTablet) {
        columnCount = 2;
    } else if (isMobile) {
        columnCount = 1;
    }

    return (
        <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
            <Search />
            <Row gutter={[16, 24]} style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                {productList.map((product) => (
                    <Col key={product.id} span={24 / columnCount}>
                        <Task product={product} />
                    </Col>
                ))}
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                {(user && user.roles.includes( "ROLE_ADMIN")) && <Button type="primary" onClick={addNewProduct}>
                    Добавить товар
                </Button>}
            </div>
        </div>
    );
};
