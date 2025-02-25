import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', new URLSearchParams({
                username,
                password
            }), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            localStorage.setItem('token', response.data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full p-2 border rounded mb-2" required />
                    <input type="password" placeholder="Password" value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full p-2 border rounded mb-2" required />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
