import React from "react";
import styles from '../styles/musicButton.module.css';

function MusicButton({ src, alt, onClick, isAnimating, isEyeOpen}){
    return (
        <button 
            onClick={onClick} 
            className={`${styles.musicButton} ${isAnimating ? styles.animating : ''} ${isEyeOpen ? styles.eyeOpen : ''}`}
            disabled={isAnimating}
        >
            <img src={src} alt={alt} className={styles.musicButtonImage}/>
        </button>
    )
}

export default MusicButton;