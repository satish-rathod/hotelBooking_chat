import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';

function Chat() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        let storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            storedUserId = 'user-' + Date.now();
            localStorage.setItem('userId', storedUserId);
        }
        setUserId(storedUserId);
    }, []);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        try {
            const res = await axios.post('http://localhost:5000/api/chat', { message, userId }, { headers: { Authorization: `Bearer ${token}` } });
            setChatHistory([...chatHistory, { user: 'You', message }, { user: 'Bot', message: res.data.response }]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <h2>Hotel Seven</h2>
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`chat-message ${chat.user === 'You' ? 'user-message' : 'bot-message'}`}>
                        {chat.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-form">
                <input type="text" value={message} onChange={handleMessageChange} placeholder="Type a message" required />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
