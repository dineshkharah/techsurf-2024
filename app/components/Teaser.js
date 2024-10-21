"use client";
import React from 'react';
import styles from '../styles/HomePage.module.css';

const Teaser = ({ image = "https://placehold.co/600x400", heading = "Default Heading", content = "Default content", link = "#" }) => {
    return (
        <div className={styles.teaser}>
            <img src={image} alt="Teaser Image" />
            <div className={styles.teaserText}>
                <h2>{heading}</h2>
                <p>{content}</p>
                <a href={link} className="btn btn-primary">Learn More</a>
            </div>
        </div>
    );
};

export default Teaser;
