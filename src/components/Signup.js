import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/AlertContext';

const Signup = () => {

    const blankCred = { name: '', email: '', password: '', cpassword: '' };
    const [credentials, setCredentials] = useState(blankCred);
    const serverHost = process.env.REACT_APP_SERVER_HOST;
    const navigate = useNavigate();
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const formSubmit = async (event) => {
        event.preventDefault();
        try {
            const { name, email, password, cpassword } = credentials;
            if (password === cpassword) {
                const url = `${serverHost}/api/auth/create_user`;
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password })
                });
                const json = await response.json();
                if (json.success) {
                    // Save authToken to localStorage
                    localStorage.setItem('token', json.authToken);
                    showAlert(`Sign up successful.`, 'success');
                    navigate('/');
                } else {
                    showAlert(`Invalid credentials provided.`, 'danger');
                }
            } else {
                showAlert(`Provided password didn't matched.`, 'danger');
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
                    <h2 className='mb-3'>Create an account</h2>
                    <form onSubmit={formSubmit}>
                        <div className="mb-3">
                            <label htmlFor="signupName" className="form-label">Name</label>
                            <input type="text" className="form-control" id="signupName" name="name" value={credentials.name} onChange={onChangeCredentials} required minLength={3} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="signupEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="signupEmail" name="email" value={credentials.email} onChange={onChangeCredentials} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="signupPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="signupPassword" name="password" value={credentials.password} onChange={onChangeCredentials} required minLength={5} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="signupCPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="signupCPassword" name="cpassword" value={credentials.cpassword} onChange={onChangeCredentials} required minLength={5} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                    </form >
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    )
}

export default Signup