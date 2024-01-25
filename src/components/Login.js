import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const serverHost = process.env.REACT_APP_SERVER_HOST;
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const formSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = `${serverHost}/api/auth/login`;
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
                showAlert(`User logged in successfully.`, 'success');
                navigate('/');
            } else {
                showAlert(`Invalid credentials provided.`, 'danger');
            }
        } catch (error) {
            showAlert(`Error: ${error.massage}`, 'danger');
        }
    }
    const onChangeCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className="row my-4">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2 className='mb-3'>Login</h2>
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
                </div>
                <div className="col-md-4"></div>
            </div>
        </>
    )
}

export default Login