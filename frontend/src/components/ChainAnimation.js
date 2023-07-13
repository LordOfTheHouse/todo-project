import React, { useEffect, useState } from 'react';
import './ChainAnimation.css';
import chainImage from '../img/chain4.png';
export const ChainAnimation = ({bot, rig}) => {
    const [chainHeight, setChainHeight] = useState(0);
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setChainHeight(prevHeight => prevHeight + 1);
        }, 20);

        setTimeout(() => {
            setAnimationFinished(true);
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="chain-container" style={{bottom:bot, right: rig}}>
            <div className={`chain-animation ${animationFinished ? 'fade-out' : ''}`} style={{ backgroundImage: `url(${chainImage})`, height: chainHeight }}>
            </div>
        </div>
    );
};
