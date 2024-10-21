import React, { useEffect, useState } from 'react';
import styles from '../styles/Canvas.module.css';
import { components } from '../userComponents';
import _, { get } from 'lodash';

const Renderer = ({ node, data, onSelect, selectedUid }) => {
    const { type, props = {}, styles = {}, children = [], uid } = node;

    const Component = components[type]?.component;

    if (!Component) return null;

    const isSelected = uid === selectedUid;
    const componentStyles = {
        ...styles,
        border: isSelected ? '2px solid yellow' : 'none',
        cursor: 'pointer',
    };

    const handleSelect = (e) => {
        e.stopPropagation();
        onSelect(uid, styles);
    };

    if (type === 'container') {
        return (
            <div
                key={uid}
                style={componentStyles}
                onClick={handleSelect}
            >
                {children.map((child, index) => (
                    <Renderer
                        key={index}
                        node={child}
                        data={data}
                        onSelect={onSelect}
                        selectedUid={selectedUid}
                    />
                ))}
            </div>
        );
    }

    const processedData = processData(props, data);

    return (
        <div
            key={uid}
            style={componentStyles}
            onClick={handleSelect}
        >
            <Component {...processedData} styles={componentStyles}>
                {children.map((child, index) => (
                    <Renderer
                        key={index}
                        node={child}
                        data={data}
                        onSelect={onSelect}
                        selectedUid={selectedUid}
                    />
                ))}
            </Component>
        </div>
    );
};

const processData = (props, data) => {
    const processedProps = {};
    for (const key in props) {
        processedProps[key] = get(data, props[key]);
    }

    return processedProps;
};

const Canvas = ({ jsonData, onComponentSelect }) => {
    const [homePageContent, setHomePageContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUid, setSelectedUid] = useState(null);

    const handleSelect = (uid, styles) => {
        const findComponent = (node) => {
            if (node.uid === uid) {
                return node;
            }
            if (node.children) {
                for (const child of node.children) {
                    const found = findComponent(child);
                    if (found) return found;
                }
            }
            return null;
        };
        const selectedNode = findComponent(jsonData); // Find the selected component from JSON
        setSelectedUid(uid);
        onComponentSelect(uid, styles, selectedNode);  // Pass selectedNode as well to include all its data (props, styles)
    };

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
            {jsonData.children.map((node, index) => (
                <Renderer
                    key={index}
                    node={node}
                    data={homePageContent}
                    onSelect={handleSelect}  // Pass the selection handler to Renderer
                    selectedUid={selectedUid}  // Pass the currently selected UID
                />
            ))}
        </div>
    );
};

export default Canvas;
