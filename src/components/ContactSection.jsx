import React from 'react';
import styles from '../styles/ContactSection.module.css';

function ContactSection() {
    return (
        <div className={styles.contactSection}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <div className={styles.contactContent}>
                <p className={styles.sectionText}>
                    Get in touch with us for bookings and collaborations.
                </p>
                <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                        <strong>Booking:</strong>
                        <span>booking@rosesinpain.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactSection;
