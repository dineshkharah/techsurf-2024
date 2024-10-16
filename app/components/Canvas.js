import React, { useEffect, useState } from 'react';
import styles from '../styles/Canvas.module.css';
import { components } from '../userComponents';
import _, { get } from 'lodash';

const Renderer = ({ node, data }) => {
    const { type, props = {}, styles = {}, children = [] } = node;

    const Component = components[type]?.component;

    if (!Component) return null;

    // Avoid wrapping in a div for specific types like 'container'
    if (type === 'container') {
        return (
            <Component key={node.key || node.type} styles={styles}>
                {children.map((child, index) => <Renderer key={index} node={child} data={data} />)}
            </Component>
        );
    }

    const processedData = processData(props, data);
    // console.log(styles)
    return (
        <div key={node.key || node.type} >
            <Component {...processedData} styles={styles}>
                {children.map((child, index) => <Renderer key={index} node={child} data={data} />)}
            </Component>
        </div>
    );
};

const processData = (props, data) => {
    const processedProps = {}
    for (const key in props) {
        processedProps[key] = get(data, props[key]);
    }

    return processedProps;
}


const Canvas = ({ jsonData }) => {
    const [homePageContent, setHomePageContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


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
                console.log('result:', result);
                setHomePageContent(result);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchHomePageContent();
    }, []);

    if (isLoading) return <div className={styles.canvas}>Loading...</div>;

    return (
        <div className={styles.canvas}>
            <h3>Canvas Area</h3>
            {jsonData.children.map((node, index) => <Renderer key={index} node={node} data={homePageContent} />)}
        </div>
    );
};

export default Canvas;
