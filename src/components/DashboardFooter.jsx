import React from 'react'
import blue_long_TMDB from '../icons/blue_long_TMDB.svg';

import './Footer.css';
import styles from '../styles/Home.module.css'

const DashboardFooter = () => {
    return (
        <footer className={styles.appFooter}>
            <p className={styles.tmdbDisclaimer}>
                This product uses 
                <img
                    src={blue_long_TMDB}
                    alt="TMDB Logo"
                    width={100}
                    height={100}
                    priority="true"
                    style={{paddingLeft: '4px', paddingRight: '4px'}}
                />
                api but is not endorsed or certified by TMDB.
            </p>
        </footer>
    )
};

export default DashboardFooter;