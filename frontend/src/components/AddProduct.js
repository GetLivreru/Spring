import React, { useState } from 'react';
import axios from 'axios';

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Product Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"  // Изменено на "number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
