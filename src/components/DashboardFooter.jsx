import React from 'react'
import blue_long_TMDB from '../icons/blue_long_TMDB.svg';

const DashboardFooter = () => {
    return (
        <div>
            <footer>
                <div>Film data from </div>
                <img src={blue_long_TMDB} />
            </footer>
            <br />
        </div>
    )
};

export default DashboardFooter;