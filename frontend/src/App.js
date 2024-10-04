import React, { useState } from 'react'; // Добавьте useState
import logo from './logo.svg';
import './App.css';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
    const [token, setToken] = useState(null); // Определите состояние для token и setToken

    const handleLogout = () => {
        setToken(null); // Обнуляем токен при выходе
    };

    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        {!token && (
                            <>
                                <li><a href="/login">Login</a></li>
                                <li><a href="/register">Register</a></li>
                            </>
                        )}
                        {token && (
                            <>
                                <li><a href="/products">Products</a></li>
                                <li><a href="/add-product">Add Product</a></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </>
                        )}
                    </ul>
                </nav>

                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/products" element={token ? <ProductList /> : <Navigate to="/login" />} />
                    <Route path="/add-product" element={token ? <AddProduct /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
