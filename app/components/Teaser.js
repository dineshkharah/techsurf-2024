"use client";
import React from 'react';
import styles from '../styles/HomePage.module.css';

const Teaser = ({ teaser }) => {
    return (
        <div className={styles.teaser}>
            <img src={teaser.image[0].image.url} alt={teaser.image[0].image_alt_text} />
            <div className={styles.teaserText}>
                <h2>{teaser.heading}</h2>
                <p>{teaser.content}</p>
                <a href={teaser.cta[0].link ? teaser.cta[0].link[0].uid : "#"} className="btn btn-primary">
                    {teaser.cta[0].text}
                </a>
            </div>
        </div>
    );
};

export default Teaser;
