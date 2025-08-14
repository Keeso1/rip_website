import React from 'react';
import styles from '../styles/AboutSection.module.css';

function AboutSection() {
    return (
        <div className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>About Us</h2>
            <div className={styles.aboutContent}>
                <p className={styles.sectionText}>
                    We are Roses In Pain, bringing you an immersive musical experience 
                    that transcends traditional boundaries.
                </p>
                <p className={styles.sectionText}>
                    Our sound blends raw emotion with haunting melodies, creating 
                    an atmosphere that resonates deep within the soul.
                </p>
            </div>
        </div>
    );
}

export default AboutSection;
