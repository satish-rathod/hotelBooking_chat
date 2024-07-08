import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:5000/api/users/register', formData);
        navigate('/login');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" name="firstName" onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="lastName" onChange={handleChange} placeholder="Last Name" required />
        <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    );
  }
  
  export default Register;
  
