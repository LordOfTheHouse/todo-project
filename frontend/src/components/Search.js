import {AutoComplete, Input} from 'antd';
import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/taskService";

const Search = () => {
    const products = useSelector((state) => state.products.products);
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    const handleSearch = (value) => {
        taskService.getProductsName(dispatch,value);
        setOptions(value ? searchResult(value) : []);

    };

    const onSelect = (value) => {
        taskService.getProductsId(dispatch,value);
    };

    const searchResult = (query) => {
        return products
            .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
            .map(product => {
                return {
                    value: product.id,
                    label: <div key={product.id}>{product.name}</div>
                }
            });
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', padding:"20px"}}>
            <AutoComplete
                popupMatchSelectWidth={252}
                style={{
                    width: 300,
                }}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
            >
                <Input.Search size="large" placeholder="Введите название продукта" enterButton/>
            </AutoComplete>
        </div>
    );
};

export default Search;