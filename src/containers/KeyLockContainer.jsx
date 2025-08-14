
import React, { useState, useRef, useEffect } from 'react';
import KeyLock from '../components/KeyLock';
import rustyKey from '../assets/rustykey.png';
import closedLock from '../assets/closedlock.png';
import openLock from '../assets/openlock.png';

function KeyLockContainer({ onUnlock }) {
    const [isDragging, setIsDragging] = useState(false);
    const [keyPosition, setKeyPosition] = useState({ x: 0, y: 0 });
    const [isUnlocked, setIsUnlocked] = useState(false);
    const keyRef = useRef(null);
    const lockRef = useRef(null);
    const timeoutRef = useRef(null); // Add ref to store timeout ID

    // Image sources managed by container (using Vite imports)
    const keyImageSrc = rustyKey;
    const lockImageSrc = isUnlocked ? openLock : closedLock;
    const lockAltText = isUnlocked ? 'Open Lock' : 'Closed Lock';

    useEffect(() => {
        console.log('isUnlocked:', isUnlocked);
        console.log('onUnlock function:', onUnlock);
        
        // Trigger onUnlock when isUnlocked changes to true
        if (isUnlocked && onUnlock) {
            console.log('Setting timeout for onUnlock...');
            timeoutRef.current = setTimeout(() => {
                console.log('Calling onUnlock!');
                onUnlock();
            }, 1000);
        }

        // Cleanup timeout on unmount or when dependencies change
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [isUnlocked, onUnlock]);

    const handleMouseDown = (e) => {
        if (isUnlocked) return; // Prevent dragging if already unlocked
        
        setIsDragging(true);
        const rect = keyRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        
        const handleMouseMove = (e) => {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            setKeyPosition({ x: newX, y: newY });
            
            // Check if key is near the lock
            if (lockRef.current) {
                const lockRect = lockRef.current.getBoundingClientRect();
                
                // Calculate key center position based on mouse position
                const keyCenterX = e.clientX;
                const keyCenterY = e.clientY;
                
                // Calculate lock center position
                const lockCenterX = lockRect.left + lockRect.width / 2;
                const lockCenterY = lockRect.top + lockRect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(keyCenterX - lockCenterX, 2) +
                    Math.pow(keyCenterY - lockCenterY, 2)
                );
                
                console.log("Distance:", distance);
                console.log("Key position:", { x: keyCenterX, y: keyCenterY });
                console.log("Lock position:", { x: lockCenterX, y: lockCenterY });
                
                // If key is close enough to lock (within 50 pixels)
                if (distance < 50 && !isUnlocked) {
                    console.log('Key is close to lock! Unlocking...');
                    setIsUnlocked(true);
                    setIsDragging(false); // Stop dragging
                    // onUnlock will be called from useEffect
                }
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            
            // If not unlocked and not close to lock, snap back to original position
            if (!isUnlocked) {
                setKeyPosition({ x: 0, y: 0 });
            }
            
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Reset function (useful for testing or restarting the interaction)
    const resetKeyLock = () => {
        // Clear any pending timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        
        setIsDragging(false);
        setKeyPosition({ x: 0, y: 0 });
        setIsUnlocked(false);
    };

    return (
        <KeyLock
            isDragging={isDragging}
            keyPosition={keyPosition}
            isUnlocked={isUnlocked}
            keyRef={keyRef}
            lockRef={lockRef}
            keyImageSrc={keyImageSrc}
            lockImageSrc={lockImageSrc}
            lockAltText={lockAltText}
            onMouseDown={handleMouseDown}
            onReset={resetKeyLock}
        />
    );
}

export default KeyLockContainer;
