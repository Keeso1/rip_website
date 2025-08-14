import React from 'react';
import styles from '../styles/KeyLock.module.css';

function KeyLock({ 
    isDragging, 
    keyPosition, 
    isUnlocked, 
    keyRef, 
    lockRef, 
    keyImageSrc,
    lockImageSrc,
    lockAltText,
    onMouseDown,
    onTouchStart,
}) {
    return (
        <div className={styles.keyLockContainer}>
            {/* Lock and Key Row */}
            <div className={styles.lockKeyRow}>
                {/* Lock */}
                <div 
                    ref={lockRef}
                    className={`${styles.lock} ${isUnlocked ? styles.unlocked : ''}`}
                >
                    <img 
                        src={lockImageSrc}
                        alt={lockAltText}
                        className={styles.lockImage}
                    />
                </div>

                {/* Key */}
                <div 
                    ref={keyRef}
                    className={`${styles.key} ${isDragging ? styles.dragging : ''} ${isUnlocked ? styles.inserted : ''}`}
                    style={{
                        transform: isDragging 
                            ? `translate(${keyPosition.x}px, ${keyPosition.y}px)` 
                            : isUnlocked 
                            ? 'translate(-2rem, 0)' 
                            : 'translate(0, 0)'
                    }}
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                >
                    <img 
                        src={keyImageSrc}
                        alt="Rusty Key"
                        className={styles.keyImage}
                    />
                </div>
            </div>

            {/* Instructions */}
            <p className={styles.instructions}>
                {isUnlocked ? 'Unlocked! Entering...' : 'Drag the key to the lock to enter'}
            </p>
        </div>
    );
}

export default KeyLock;
