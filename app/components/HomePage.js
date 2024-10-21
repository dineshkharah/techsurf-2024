"use client";
import { useEffect, useState } from 'react';
import Teaser from '../components/Teaser';
import CardCollection from '../components/CardCollection';
import TextAndImage from '../components/TextAndImage';
import FeaturedArticles from '../components/FeaturedArticles';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
    const [homePageContent, setHomePageContent] = useState(null);

    useEffect(() => {
        const fetchHomePageContent = async () => {
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
                setHomePageContent(result.entry);
                console.log(result.entry);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchHomePageContent();
    }, []);

    if (!homePageContent) return <div>Loading...</div>;

    const { title, components, featured_articles } = homePageContent;

    const teasers = components.filter(c => c.teaser);
    const cardCollections = components.filter(c => c.card_collection);
    const textAndImages = components.filter(c => c.text_and_image);

    return (
        <div className={styles.homepage}>

            {teasers.length > 0 && (
                <Teaser
                    image={teasers[0].teaser.image[0].image.url}
                    heading={teasers[0].teaser.heading}
                    content={teasers[0].teaser.content}
                    link={teasers[0].teaser.cta[0].link ? teasers[0].teaser.cta[0].link[0].uid : "#"}
                />
            )}

            {cardCollections.map((component, index) => (
                <CardCollection
                    key={index}
                    header={component.card_collection.header}
                    cards={component.card_collection.cards}
                />
            ))}

            <div className={styles.textImageSection}>
                <h2>Text and Image Section</h2>
                <div className={styles.textImageGrid}>
                    {textAndImages.map((component, index) => (
                        <TextAndImage
                            key={index}
                            image={component.text_and_image.image.url}
                            heading={component.text_and_image.heading}
                            content={component.text_and_image.content}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HomePage;
