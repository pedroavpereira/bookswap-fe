// AnimationBackground.jsx
import React, { useEffect } from 'react';

const AnimationBackground = () => {
    useEffect(() => {
        const background = document.getElementById('animation-background');
        const elements = ['📚', '📖', '🔖', '✒️', '📝'];
        const numElements = 40
        ;

        for (let i = 0; i < numElements; i++) {
            createAnimatedElement(background, elements[Math.floor(Math.random() * elements.length)]);
        }

        function createAnimatedElement(container, content) {
            const element = document.createElement('div');
            element.className = 'animated-element';
            element.textContent = content;

            // Apply stronger orange tint and increase visibility
            element.style.filter = 'hue-rotate(45deg) brightness(2) saturate(3)'; // Increase brightness and saturation
            element.style.color = '#FF8C00'; // A stronger orange color
            element.style.opacity = '0.7'; // Slightly more opaque for better visibility

            element.style.fontSize = `${Math.random() * 40 + 30}px`;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            element.style.left = `${startX}vw`;
            element.style.top = `${startY}vh`;

            const translateX = (Math.random() - 0.5) * 300;
            const translateY = (Math.random() - 0.5) * 300;
            const rotate = (Math.random() - 0.5) * 720;
            const duration = Math.random() * 10 + 5; // Faster animation, between 5s and 15s

            element.style.setProperty('--translateX', `${translateX}px`);
            element.style.setProperty('--translateY', `${translateY}px`);
            element.style.setProperty('--rotate', `${rotate}deg`);
            element.style.animation = `float ${duration}s infinite alternate ease-in-out`;

            container.appendChild(element);
        }

        // Cleanup function to remove elements when component unmounts
        return () => {
            if (background) {
                background.innerHTML = '';
            }
        };
    }, []);

    return <div id="animation-background" style={styles.animationBackground}></div>;
};

const styles = {
    animationBackground: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        backgroundColor: '#fafafa',
    },
};

export default AnimationBackground;