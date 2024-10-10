"use client";
import { useEffect, useState } from 'react';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
    const [homePageContent, setHomePageContent] = useState(null);

    // Fetch home page content
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
                setHomePageContent(result.entry);  // Adjusted to directly access the entry from result
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchHomePageContent();
    }, []);

    if (!homePageContent) return <div>Loading...</div>;

    const { title, components, featured_articles } = homePageContent;

    const truncateText = (text, charLimit) => {
        return text.length > charLimit ? `${text.substring(0, charLimit)}...` : text;
    };

    // Filtering components by type (teaser, card_collection, text_and_image)
    const teasers = components.filter(c => c.teaser);
    const cardCollections = components.filter(c => c.card_collection);
    const textAndImages = components.filter(c => c.text_and_image);

    return (
        <div className={styles.homepage}>

            {/* Teaser Section (First Teaser Above Card Collection) */}
            <div className={styles.teaserSection}>
                {teasers.length > 0 && (
                    <div className={styles.teaser}>
                        <img src={teasers[0].teaser.image[0].image.url} alt={teasers[0].teaser.image[0].image_alt_text} />
                        <div className={styles.teaserText}>
                            <h2>{teasers[0].teaser.heading}</h2>
                            <p>{teasers[0].teaser.content}</p>
                            {/* Use Contentstack UI Kit button */}
                            <a href={teasers[0].teaser.cta[0].link ? teasers[0].teaser.cta[0].link[0].uid : "#"} className="btn btn-primary">
                                {teasers[0].teaser.cta[0].text}
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {/* Card Collection Section */}
            <div className={styles.cardCollectionSection}>
                {cardCollections.map((component, index) => (
                    <div key={index} className={styles.cardCollection}>
                        <h2>{component.card_collection.header.heading}</h2>
                        <p>{component.card_collection.header.sub_heading}</p> {/* Complete subtitle */}
                        <div className={styles.cards}>
                            {component.card_collection.cards.map((card, index) => (
                                <div key={index} className={styles.card}>
                                    <img src={card.image.url} alt={card.image_alt_text} />
                                    <h3>{card.title}</h3>
                                    <p>{card.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Text and Image Section */}
            <div className={styles.textImageSection}>
                <h2>Text and Image Section</h2>
                <div className={styles.textImageGrid}>
                    {textAndImages.map((component, index) => (
                        <div key={index} className={styles.textImageCard}>
                            <img
                                src={component.text_and_image.image.url}
                                alt={component.text_and_image.image_alt_text}
                            />
                            <div className={styles.textContent}>
                                <h2>{component.text_and_image.heading}</h2>
                                <p>{truncateText(component.text_and_image.content, 150)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Teaser Section (Second Teaser Above Articles) */}
            <div className={styles.teaserSection}>
                {teasers.length > 1 && (
                    <div className={styles.teaser}>
                        <img src={teasers[1].teaser.image[0].image.url} alt={teasers[1].teaser.image[0].image_alt_text} />
                        <div className={styles.teaserText}>
                            <h2>{teasers[1].teaser.heading}</h2>
                            <p>{teasers[1].teaser.content}</p>
                            {/* Use Contentstack UI Kit button */}
                            <a href={teasers[1].teaser.cta[0].link ? teasers[1].teaser.cta[0].link[0].uid : "#"} className="btn btn-primary">
                                {teasers[1].teaser.cta[0].text}
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {/* Featured Articles Section */}
            <section className={styles.featuredArticles}>
                {featured_articles && (
                    <>
                        <h2>{featured_articles.heading}</h2>
                        <div className={styles.articles}>
                            {featured_articles.articles.map((article, index) => (
                                <article key={index}>
                                    <h3>Article Title</h3>
                                    {/* Assuming you will add article details later */}
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default HomePage;
