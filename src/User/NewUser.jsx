import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../App.css';

import { axiosPost } from '../hooks/useAxios';

const NewUser = () => {
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({ username: "", password: "" });

    const history = useNavigate();

    const handleUsernameInput = (e) => {
        setUserInfo((prevState) => ({
            ...prevState,
            username: e.target.value
        }));
    }

    const handlePasswordInput = (e) => {
        setUserInfo((prevState) => ({
            ...prevState,
            password: e.target.value
        }));
    }

    const saveUser = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(userInfo));

        axiosPost('/user/newuser', userInfo).then((response) => {
            console.log(response);
            history('/');
            setUserInfo({ username: "", password: "" });
            setOpen(false);
        })
    }

    return (
        <div>
            <Button
                onClick={() => setOpen(true)}
            >
                Create new user
            </Button>
            {open &&
                <div className="container">
                    <div className="row">
                        <div className="modal-reel-talk">
                            <div className="modal-inner-custom">
                                <div className="card col-md-6 offset-md-3 offset-md-3">
                                    <h3 className="text-center">Add new user</h3>
                                    <div className = "card-body">
                                        <form>
                                            <div className="form-group">
                                                <label>Username: </label>
                                                <input 
                                                    className="form-control"
                                                    placeholder="Username"
                                                    value={userInfo.username}
                                                    onChange={handleUsernameInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Password: </label>
                                                <input 
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={userInfo.password}
                                                    onChange={handlePasswordInput}
                                                />
                                            </div>
                                            <button className="btn btn-success ml-2" onClick={saveUser}>Save</button>
                                            <button className="btn btn-danger ml-2" onClick={() => setOpen(false)}>Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default NewUser;