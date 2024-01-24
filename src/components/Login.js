import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const formSubmit = async (event) => {
        event.preventDefault();
        const server_host = process.env.SERVER_HOST;
        console.log(server_host);
        const url = `http://localhost:3100/api/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            // Save authToken to localStorage
            localStorage.setItem('token', json.authToken);
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    }
    const onChangeCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="loginEmail" name="email" value={credentials.email} onChange={onChangeCredentials} />
                </div>
                <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="loginPassword" name="password" value={credentials.password} onChange={onChangeCredentials} />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </form>
        </>
    )
}

export default Login