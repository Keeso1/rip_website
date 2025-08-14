import React from 'react';
import styles from '../styles/MainPageTitle.module.css';

function MainPageTitle({ bandName, onBack }) {
    return (
        <header className={styles.titleContainer}>
            <h1 className={styles.bandName}>{bandName}</h1>
            <button 
                className={styles.backButton}
                onClick={onBack}
                aria-label="Go back to landing page"
            >
                ← Back
            </button>
        </header>
    );
}

export default MainPageTitle;
