import React from 'react';
import styles from '../styles/LandingPage.module.css';
import KeyLockContainer from '../containers/KeyLockContainer';

function LandingPage({ onEnterMain }) {
    const handleUnlock = () => {
        console.log('Key unlocked! Transitioning to main content...');
        // Call the parent function to transition to main page
        setTimeout(() => {
            onEnterMain && onEnterMain();
        }, 1500); // Wait for unlock animation to complete
    };

    return (
        <div className={styles.landingContainer}>
            <div className={styles.content}>
                <h1 className={styles.bandName}>Roses In Pain</h1>
                <p className={styles.subtitle}>An Immersive Experience</p>
                
                <KeyLockContainer onUnlock={handleUnlock} />
            </div>
        </div>
    );
}

export default LandingPage;
