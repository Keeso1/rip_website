import React, { useState } from 'react';
import styles from '../styles/MainPageContentContainer.module.css';
import MusicSection from '../components/MusicSection';
import AboutSection from '../components/AboutSection';
import TourSection from '../components/TourSection';
import ContactSection from '../components/ContactSection';

function MainPageContentContainer() {
    const [activeSection, setActiveSection] = useState('music');

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'music':
                return <MusicSection />;
            case 'about':
                return <AboutSection />;
            // case 'tour':
            //     return <TourSection />;
            case 'contact':
                return <ContactSection />;
            default:
                return <MusicSection />;
        }
    };

    return (
        <main className={styles.contentContainer}>
            {/* Section Navigation */}
            <nav className={styles.sectionNav}>
                <button 
                    className={`${styles.navButton} ${activeSection === 'music' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('music')}
                >
                    Music
                </button>
                <button 
                    className={`${styles.navButton} ${activeSection === 'about' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('about')}
                >
                    About
                </button>
                {/* <button 
                    className={`${styles.navButton} ${activeSection === 'tour' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('tour')}
                >
                    Tour
                </button> */}
                <button 
                    className={`${styles.navButton} ${activeSection === 'contact' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('contact')}
                >
                    Contact
                </button>
            </nav>

            {/* Active Section Content */}
            <div className={styles.sectionContent}>
                {renderSection()}
            </div>
        </main>
    );
}

export default MainPageContentContainer;
