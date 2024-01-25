import React, { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext';

const Alert = (props) => {
    const alertContext = useContext(AlertContext);
    const { alert } = alertContext;
    return (
        alert && <>
            <div className={`alert alert-${alert.type}`} role="alert">
                {alert.msg}
            </div>
        </>
    )
}

export default Alert;