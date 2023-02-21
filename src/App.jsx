import './App.css';
import { connect } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';
import HomePage from './Home/HomePage';
import Takes from './Comments/Takes';


const App = () => {
    return (
        <div className="App">
            <Router>
            <DashboardHeader />
                <Routes>
                    <Route 
                        path="/"
                        element={
                            <HomePage style={{height:"30%"}} />
                        }
                    />
                    <Route
                        path="/takes/:mediatype/:itemid"
                        element={
                            <Takes />
                        }
                    />
                </Routes>
            <DashboardFooter />
            </Router>
        </div>
  )
}

const mapStateToProps = (state) => {
    return {
        userData: state.user
    }
}

export default connect(mapStateToProps)(App);
