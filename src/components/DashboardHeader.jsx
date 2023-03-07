import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { connect } from 'react-redux';
import { logoutUser } from '../reducer/auth/authActions';
import NewUser from '../User/NewUser';
import Login from '../User/Login';
import reel from '../icons/reel.svg';

import './Header.css';

const theme = createTheme({
    background: "#f7df1e",
    color: "#24292e",
    components: {
        MuiToolbar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'black',
                    paddingLeft: '0px !important'
                }
            }
        }
    }
});

const DashboardHeader = ({
    auth,
    logoutUser
}) => {
    const handleLogout = () => {
        logoutUser();
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <img className="reel-logo" src={reel} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            <div className='header-title'>Reel Talk</div>
                        </Typography>
                        {auth.isLoggedIn ?
                        <div style={{position: "right", padding: "2px"}}>
                            <Button
                                onClick={handleLogout}
                            >
                                Log out
                            </Button>
                        </div>
                        :
                        <ButtonGroup variant="text">
                            <NewUser />
                            <Login />
                        </ButtonGroup>}
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);