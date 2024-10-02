import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css'



const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Преобразование price в число
        const newProduct = {
            name,
            price: parseFloat(price) // Преобразуем строку в число
        };

        // Проверка на NaN (Not a Number)
        if (isNaN(newProduct.price)) {
            console.error("Price must be a valid number.");
            return;
        }

        axios.post('http://localhost:8080/api/products', newProduct)
            .then(response => {
                console.log('Product added:', response.data);
                setName('');
                setPrice('');
            })
            .catch(error => {
                console.error("There was an error adding the product!", error);
            });
    };

    return (
        <div className="add-product-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="add-product-button">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
