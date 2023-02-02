import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';

const UserComponent = () => {
    const [state, setState] = useState([]);
    
    useEffect(() => {
        UserService.getUsers().then((response) => {
            console.log(response);
            setState(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    
    return (
        <div>
            <div>
                {
                    state.map(user =>
                        <ul>{user.username}</ul>
                    )
                }
            </div>
            <div>Test</div>
        </div>
    )
}

export default UserComponent;