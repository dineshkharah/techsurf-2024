// app/pages/ServicesPage.js
"use client";
import { useEffect, useState } from 'react';
import styles from '../app/styles/Services.module.css';

const ServicesPage = () => {
    const [servicesContent, setServicesContent] = useState(null);

    useEffect(() => {
        const fetchServicesContent = async () => {
            try {
                const response = await fetch(
                    `https://eu-cdn.contentstack.com/v3/content_types/services/entries?environment=${process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT}`,
                    {
                        headers: {
                            'api_key': process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
                            'access_token': process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
                        },
                    }
                );
                const result = await response.json();
                setServicesContent(result.entries[0]); // Assuming one entry
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchServicesContent();
    }, []);

    if (!servicesContent) return <div>Loading...</div>;

    return (
        <div className={styles.services}>
            <h1>{servicesContent.title}</h1>
            <div className={styles.serviceCards}>
                {servicesContent.cards.map((card, index) => (
                    <div key={index} className={styles.card}>
                        <h2>{card.title}</h2>
                        <p>{card.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;
