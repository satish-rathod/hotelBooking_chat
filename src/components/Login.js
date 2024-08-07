import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await axios.post(`http://localhost:5000/api/users/login`, formData);
            localStorage.setItem('token', res.data.token);
            navigate('/chat');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
