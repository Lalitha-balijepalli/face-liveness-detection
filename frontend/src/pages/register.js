import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/register', { username, email, password });
            setMessage('Registration successful! Redirecting...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage('Registration failed. Try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
                {message && <p className="text-center">{message}</p>}
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Username" value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full p-2 border rounded mb-2" required />
                    <input type="email" placeholder="Email" value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full p-2 border rounded mb-2" required />
                    <input type="password" placeholder="Password" value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full p-2 border rounded mb-2" required />
                    <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
