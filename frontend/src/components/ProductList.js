import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css'


const ProductList = () => {
    const [products, setProducts] = useState([]);

    // Получение списка продуктов
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    };

    // Функция для удаления продукта по ID
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/products/${id}`)
            .then(response => {
                console.log(`Product with id ${id} deleted.`);
                // Удаляем продукт из состояния после успешного удаления
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error("There was an error deleting the product!", error);
            });
    };

    return (
        <div className="product-list-container">
            <h1>Product List</h1>
            <ul className="product-list">
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
