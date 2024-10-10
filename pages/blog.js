// app/pages/BlogPage.js
"use client";
import { useEffect, useState } from 'react';
import styles from '../app/styles/Blog.module.css';

const BlogPage = () => {
    const [blogContent, setBlogContent] = useState(null);

    useEffect(() => {
        const fetchBlogContent = async () => {
            try {
                const response = await fetch(
                    `https://eu-cdn.contentstack.com/v3/content_types/blog/entries?environment=${process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT}`,
                    {
                        headers: {
                            'api_key': process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
                            'access_token': process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
                        },
                    }
                );
                const result = await response.json();
                setBlogContent(result.entries); // Assuming multiple blog entries
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchBlogContent();
    }, []);

    if (!blogContent) return <div>Loading...</div>;

    return (
        <div className={styles.blog}>
            <h1>Latest Blog Posts</h1>
            <div className={styles.blogCards}>
                {blogContent.map((post, index) => (
                    <div key={index} className={styles.card}>
                        <h2>{post.title}</h2>
                        <p>{post.summary}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
