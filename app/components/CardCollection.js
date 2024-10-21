"use client";
import React from 'react';
import styles from '../styles/HomePage.module.css';

const CardCollection = ({ header = { heading: "Default Heading", sub_heading: "Default Subheading" }, cards = [] }) => {
    return (
        <div className={styles.cardCollection}>
            <h2>{header.heading}</h2>
            <p>{header.sub_heading}</p>
            <div className={styles.cards}>
                {cards.length > 0 ? cards.map((card, index) => (
                    <div key={index} className={styles.card}>
                        <img src={card.image.url} alt={card.image_alt_text || "Card Image"} />
                        <h3>{card.title}</h3>
                        <p>{card.subtitle}</p>
                    </div>
                )) : <p>No cards available</p>}
            </div>
        </div>
    );
};

export default CardCollection;
