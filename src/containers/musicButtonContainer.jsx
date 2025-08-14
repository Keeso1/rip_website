import React, { useState, useRef, useEffect } from 'react';
import MusicButton from '../components/musicButton';
import punkeyeClosed from '../assets/punkeye_closed.png';
import punkeyeHalfOpen from '../assets/punkeye_halfopen.png';
import punkeyeFullyOpen from '../assets/punkeye_fullyopen.png';

function MusicButtonContainer(){
    const images = [
        punkeyeClosed,
        punkeyeHalfOpen, 
        punkeyeFullyOpen
    ];
    const musicSrc = '/src/assets/deaftonesprototype.mp3';
    const animationDuration = 500;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const audioRef = useRef(null);
    const animationIntervalRef = useRef(null);

    useEffect(() => {
        // Initialize audio element
        audioRef.current = new Audio(musicSrc);
        audioRef.current.loop = true;

        return () => {
            // Cleanup
            stopMusic();
            if (animationIntervalRef.current) {
                clearInterval(animationIntervalRef.current);
            }
        };
    }, [musicSrc]);

    const startOpenAnimation = () => {
        setIsAnimating(true);
        let imageIndex = 0;
        // Start music
        startMusic();
        animationIntervalRef.current = setInterval(() => {
            setCurrentImageIndex(imageIndex);
            imageIndex++;
            
            if (imageIndex >= images.length) {
                clearInterval(animationIntervalRef.current);
                setIsAnimating(false);
                setIsEyeOpen(true);
                // Stay at fully open (index 2)
                setCurrentImageIndex(2);
            }
        }, animationDuration);
    };

    const closeEye = () => {
        setCurrentImageIndex(0); // Go back to closed
        setIsEyeOpen(false);
        stopMusic();
    };

    const startMusic = () => {
        if (audioRef.current && !isPlaying) {
            audioRef.current.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            setIsPlaying(true);
        }
    };

    const stopMusic = () => {
        if (audioRef.current && isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset to beginning
            setIsPlaying(false);
        }
    };

    const handleButtonClick = () => {
        if (!isAnimating) {
            if (isEyeOpen) {
                // Eye is open, close it and stop music
                closeEye();
            } else {
                // Eye is closed, start opening animation
                startOpenAnimation();
            }
        }
    };

    return (
        <div>
            <MusicButton
            src={images[currentImageIndex]}
            alt={`Punk eye ${isEyeOpen ? 'open' : 'closed'}`}
            onClick={handleButtonClick}
            isAnimating={isAnimating}
            isEyeOpen={isEyeOpen}
            />
        </div>
        
    );
};

export default MusicButtonContainer;