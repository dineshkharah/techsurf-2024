"use client";
import { useEffect, useState } from 'react';
import Teaser from '../app/components/Teaser';
import CardCollection from '../app/components/CardCollection';
import TextAndImage from '../app/components/TextAndImage';
import FeaturedArticles from '../app/components/FeaturedArticles';
import styles from '../app/styles/VisualsPage.module.css';

const VisualsPage = () => {
    const [pageContent, setPageContent] = useState(null);

    useEffect(() => {
        const fetchVisualsPageContent = async () => {
            try {
                const response = await fetch(
                    `https://eu-cdn.contentstack.com/v3/content_types/home_page/entries/blt6fc0d25de58dd3cb?environment=${process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT}`,
                    {
                        headers: {
                            'api_key': process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
                            'access_token': process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
                            'region': process.env.NEXT_PUBLIC_CONTENTSTACK_REGION,
                        },
                    }
                );
                const result = await response.json();
                setPageContent(result.entry);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchVisualsPageContent();
    }, []);

    if (!pageContent) return <div>Loading...</div>;

    // Extract components from fetched content
    const { components, featured_articles } = pageContent;

    // Filter different components by type
    const teasers = components.filter(c => c.teaser);
    const cardCollections = components.filter(c => c.card_collection);
    const textAndImages = components.filter(c => c.text_and_image);

    return (
        <div className={styles.visualsPage}>

            {/* Teasers Section */}
            {teasers.length > 0 && (
                <section className={styles.visualSection}>
                    <h2>Teaser Component</h2>
                    <Teaser teaser={teasers[0].teaser} />
                </section>
            )}

            {/* Card Collections Section */}
            {cardCollections.map((component, index) => (
                <section key={index} className={styles.visualSection}>
                    <h2>Card Collection Component</h2>
                    <CardCollection cardCollection={component.card_collection} />
                </section>
            ))}

            {/* Text and Image Section */}
            <section className={styles.visualSection}>
                <h2>Text and Image Component</h2>
                <div className={styles.textImageGrid}>
                    {textAndImages.map((component, index) => (
                        <TextAndImage key={index} textAndImage={component.text_and_image} />
                    ))}
                </div>
            </section>

            {/* Featured Articles Section */}
            {featured_articles && (
                <section className={styles.visualSection}>
                    <h2>Featured Articles Component</h2>
                    <FeaturedArticles featuredArticles={featured_articles} />
                </section>
            )}
        </div>
    );
};

export default VisualsPage;
