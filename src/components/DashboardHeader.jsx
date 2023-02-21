import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavBar, Nav } from 'react-bootstrap';
import { logoutUser } from '../reducer/auth/authActions';
import NewUser from '../User/NewUser';
import Login from '../User/Login';
import reel from '../icons/reel.svg';

import './Header.css';

const DashboardHeader = ({
    auth,
    logoutUser
}) => {
    const history = useNavigate();

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <span className="header">
            <Nav className="navbar-left">
                <header className="title-logo">
                    <img className="reel-logo" src={reel} />
                    <h3 className="header-title">
                        Reel Talk
                    </h3>
                </header>
            </Nav>
            {auth.isLoggedIn ?
            <Nav className="navbar-right">
                <div style={{position: "right", padding: "2px"}}>
                    <button
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            </Nav>
            : <Nav className="navbar-right">
                <div style={{position: "right", padding: "2px"}}>
                    <NewUser />
                </div>
                <div style={{position: "right", padding: "2px"}}>
                    <Login />
                </div>
            </Nav>}
        </span>
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);