"use client";
import React from 'react';
import styles from '../styles/HomePage.module.css';

const TextAndImage = ({ textAndImage }) => {
    const truncateText = (text, charLimit) => {
        return text.length > charLimit ? `${text.substring(0, charLimit)}...` : text;
    };

    return (
        <div className={styles.textImageCard}>
            <img src={textAndImage.image.url} alt={textAndImage.image_alt_text} />
            <div className={styles.textContent}>
                <h2>{textAndImage.heading}</h2>
                <p>{truncateText(textAndImage.content, 150)}</p>
            </div>
        </div>
    );
};

export default TextAndImage;
