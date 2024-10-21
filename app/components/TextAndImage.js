"use client";
import React from 'react';
import styles from '../styles/HomePage.module.css';

const TextAndImage = ({ image = "https://placehold.co/600x400", heading = "Default Heading", content = "Default content" }) => {
    const truncateText = (text, charLimit) => {
        return text.length > charLimit ? `${text.substring(0, charLimit)}...` : text;
    };

    return (
        <div className={styles.textImageCard}>
            <img src={image} alt="Text and Image Section" />
            <div className={styles.textContent}>
                <h2>{heading}</h2>
                <p>{truncateText(content, 150)}</p>
            </div>
        </div>
    );
};

export default TextAndImage;
