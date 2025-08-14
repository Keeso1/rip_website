import React from 'react';
import styles from '../styles/AboutSection.module.css';

function AboutSection() {
    return (
        <div className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>About Us</h2>
            <div className={styles.aboutContent}>
                <p className={styles.sectionText}>
                    We are Roses In Pain. Bla bla bla bla blaaaaa
                </p>
                <p className={styles.sectionText}>
                    We want to maake muuuusicc!!!
                </p>
            </div>
        </div>
    );
}

export default AboutSection;
