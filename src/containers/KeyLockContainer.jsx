
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

    // Mouse events
    const handleMouseDown = (e) => {
        if (isUnlocked) return;
        setIsDragging(true);
        const rect = keyRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const handleMouseMove = (e) => {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            setKeyPosition({ x: newX, y: newY });
            checkUnlock(e.clientX, e.clientY);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            if (!isUnlocked) setKeyPosition({ x: 0, y: 0 });
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Touch events
    const handleTouchStart = (e) => {
        if (isUnlocked) return;
        setIsDragging(true);
        const touch = e.touches[0];
        const rect = keyRef.current.getBoundingClientRect();
        const offsetX = touch.clientX - rect.left - rect.width / 2;
        const offsetY = touch.clientY - rect.top - rect.height / 2;

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            const newX = touch.clientX - offsetX;
            const newY = touch.clientY - offsetY;
            setKeyPosition({ x: newX, y: newY });
            checkUnlock(touch.clientX, touch.clientY);
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
            if (!isUnlocked) setKeyPosition({ x: 0, y: 0 });
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
    };

    // Shared unlock check
    const checkUnlock = (clientX, clientY) => {
        if (lockRef.current) {
            const lockRect = lockRef.current.getBoundingClientRect();
            const lockCenterX = lockRect.left + lockRect.width / 2;
            const lockCenterY = lockRect.top + lockRect.height / 2;
            const distance = Math.sqrt(
                Math.pow(clientX - lockCenterX, 2) +
                Math.pow(clientY - lockCenterY, 2)
            );
            if (distance < 50 && !isUnlocked) {
                setIsUnlocked(true);
                setIsDragging(false);
            }
        }
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
            onTouchStart={handleTouchStart}
        />
    );
}

export default KeyLockContainer;
