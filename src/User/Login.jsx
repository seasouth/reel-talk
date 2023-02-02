import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert, Card } from 'react-bootstrap';
import { axiosPost } from '../hooks/useAxios';
import { authenticateUser } from '../reducer/auth/authActions';

const Login = ({
    auth,
    authenticateUser
}) => {
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            setError("");
        }
    }, [open]);

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

    const logUserIn = (e) => {
        e.preventDefault();
        authenticateUser(userInfo.username, userInfo.password);

        setTimeout(() => {
            console.log(auth);
            if (auth.isLoggedIn) {
                setUserInfo({ username: "", password: "" });
                setOpen(false);
            } else {
                setUserInfo({ username: "", password: "" });
                setError("Invalid Username or Password");
            }
        })

        /*
        console.log(JSON.stringify(userInfo));

        axiosPost('/api/login', userInfo).then((response) => {
            console.log(response);
            setUserInfo({ username: "", password: "" });
            setOpen(false);
        })
        */
    }

    return (
        <div>
            <button 
                onClick={() => setOpen(true)}
                className="btn btn-secondary"
            >
                Login
            </button>
            {open &&
                <div className="container">
                    <div className="row">
                        <div className="modal-reel-talk">
                            <div className="modal-inner-custom">
                                <div className="card col-md-6 offset-md-3 offset-md-3">
                                    <Card.Header>
                                        {error.length > 0 && <Alert variant="danger">{error}</Alert>}
                                        <h3 className="text-center">Login</h3>
                                    </Card.Header>
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
                                            <Card.Footer>
                                                <button 
                                                    className="btn btn-success ml-2" 
                                                    onClick={logUserIn}
                                                    disabled={userInfo.username.length === 0 || userInfo.password.length < 4}
                                                >
                                                    Login
                                                </button>
                                                <button 
                                                    className="btn btn-danger ml-2" 
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </Card.Footer>
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

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    authenticateUser: (username, password) => dispatch(authenticateUser(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);