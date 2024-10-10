import React, { useEffect, useState } from 'react';
import styles from '../app/styles/AboutUs.module.css';

const AboutUsPage = () => {
    const [aboutUsContent, setAboutUsContent] = useState(null);

    useEffect(() => {
        const fetchAboutUsContent = async () => {
            try {
                const response = await fetch(
                    `https://eu-cdn.contentstack.com/v3/content_types/landing_page/entries/bltc1d2ab6493a57412?environment=${process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT}`,
                    {
                        headers: {
                            'api_key': process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
                            'access_token': process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
                        },
                    }
                );
                const result = await response.json();
                setAboutUsContent(result.entry);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchAboutUsContent();
    }, []);

    if (!aboutUsContent) return <div>Loading...</div>;

    const { components } = aboutUsContent;

    return (
        <div className={styles.aboutus}>
            {components.map((component, index) => (
                <div key={index} className={styles.card}>
                    {/* Render Text Component */}
                    {component.text && (
                        <div className={styles.textSection}>
                            <h1>{component.text.content.children[0].children[0].text}</h1>
                        </div>
                    )}
                    {/* Render Text and Image Component */}
                    {component.text_and_image && (
                        <div className={styles.cardContent}>
                            <img
                                src={component.text_and_image.image.url}
                                alt={component.text_and_image.image_alt_text}
                                className={styles.cardImage}
                            />
                            <div className={styles.textSection}>
                                <h2>{component.text_and_image.heading}</h2>
                                <p>{component.text_and_image.content}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AboutUsPage;
