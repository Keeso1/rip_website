import React from 'react';
import styles from '../styles/MusicSection.module.css';
import MusicButtonContainer from '../containers/musicButtonContainer';

function MusicSection() {
    return (
        <div className={styles.musicSection}>
            <h2 className={styles.sectionTitle}>Our Sound</h2>
            <div className={styles.musicContent}>
                <MusicButtonContainer />
            </div>
        </div>
    );
}

export default MusicSection;
