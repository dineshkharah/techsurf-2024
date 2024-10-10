"use client";
import React from 'react';
import styles from '../styles/HomePage.module.css';

const CardCollection = ({ cardCollection }) => {
    return (
        <div className={styles.cardCollection}>
            <h2>{cardCollection.header.heading}</h2>
            <p>{cardCollection.header.sub_heading}</p>
            <div className={styles.cards}>
                {cardCollection.cards.map((card, index) => (
                    <div key={index} className={styles.card}>
                        <img src={card.image.url} alt={card.image_alt_text} />
                        <h3>{card.title}</h3>
                        <p>{card.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardCollection;
