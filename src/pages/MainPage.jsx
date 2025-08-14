import React from 'react';
import styles from '../styles/MainPage.module.css';
import MainPageTitle from '../components/MainPageTitle';
import MainPageContentContainer from '../containers/MainPageContentContainer';

function MainPage({ onBackToLanding }) {
    return (
        <div className={styles.mainContainer}>
            {/* Background overlay */}
            <div className={styles.backgroundOverlay}></div>
            
            {/* Main page structure */}
            <div className={styles.pageWrapper}>
                {/* 1. Title Component */}
                <MainPageTitle 
                    bandName="Roses In Pain" 
                    onBack={onBackToLanding}
                />
                
                {/* 2. Content Component */}
                <MainPageContentContainer />
            </div>
        </div>
    );
}

export default MainPage;
