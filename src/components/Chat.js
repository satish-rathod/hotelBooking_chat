import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:5000/api/chat',{ message },{ headers: { Authorization: `Bearer ${token}` } });
            setChatHistory([...chatHistory, { user: 'You', message }, { user: 'Bot', message: res.data.response }]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h2>Chat with the Bot</h2>
            <div>
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <strong>{chat.user}:</strong> {chat.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input type="text" value={message} onChange={handleMessageChange} placeholder="Type a message" required />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
