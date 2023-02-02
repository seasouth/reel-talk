import './App.css';
import { connect } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Carousel as Slider } from './components/Carousel';
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
                        path="/takes"
                        element={
                            <Takes />
                        }
                    />
                </Routes>
            <Slider />
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
