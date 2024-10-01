import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const newProduct = { name, price };
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
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
