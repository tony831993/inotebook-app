import React, { useState } from 'react'
import UserContext from './UserContext'

const UserState = (props) => {
    const host = process.env.SERVER_HOST;
    let emptyUser = { email: '', authToken: '' };
    const [user, setUser] = useState(emptyUser);

    const loginUser = async (user) => {
        try {
            const url = `${host}/api/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, tag }),
            });
            const json = await response.json()
            // if (json) {
            //     setUser(json)
            // }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <UserContext.Provider value={{ loginUser }}>
            <props.childern />
        </UserContext.Provider>
    )
}

export default UserState
