"use client";
import React from 'react';
import styles from '../styles/HomePage.module.css';

const FeaturedArticles = ({ featuredArticles }) => {
    return (
        <section className={styles.featuredArticles}>
            <h2>{featuredArticles.heading}</h2>
            <div className={styles.articles}>
                {featuredArticles.articles.map((article, index) => (
                    <article key={index}>
                        <h3>Article Title</h3>
                        {/* Placeholder for article title, assuming you'll add actual article details later */}
                    </article>
                ))}
            </div>
        </section>
    );
};

export default FeaturedArticles;
