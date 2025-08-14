import React from 'react';
import styles from '../styles/TourSection.module.css';

function TourSection() {
    const tourDates = [
        { date: 'Sep 15, 2025', venue: 'The Underground', city: 'New York, NY' },
        { date: 'Sep 22, 2025', venue: 'Midnight Club', city: 'Los Angeles, CA' },
        { date: 'Oct 1, 2025', venue: 'The Vault', city: 'Chicago, IL' },
    ];

    return (
        <div className={styles.tourSection}>
            <h2 className={styles.sectionTitle}>Tour Dates</h2>
            <div className={styles.tourContent}>
                {tourDates.length > 0 ? (
                    <div className={styles.datesList}>
                        {tourDates.map((show, index) => (
                            <div key={index} className={styles.tourDate}>
                                <div className={styles.dateInfo}>
                                    <span className={styles.date}>{show.date}</span>
                                    <span className={styles.venue}>{show.venue}</span>
                                    <span className={styles.city}>{show.city}</span>
                                </div>
                                <button className={styles.ticketButton}>Tickets</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={styles.sectionText}>
                        Check back soon for upcoming tour dates and venues.
                    </p>
                )}
            </div>
        </div>
    );
}

export default TourSection;
