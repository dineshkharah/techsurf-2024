import React, { useState } from 'react';
import LeftSidebar from '../app/components/LeftSidebar';
import Canvas from '../app/components/Canvas';
import RightSidebar from '../app/components/RightSidebar';
import styles from '../app/styles/UIBuilder.module.css';
import jsonData from '../app/userComponents/something.json'; // Importing JSON data

const UIBuilder = () => {
    const components = ['Teaser', 'Card Collection', 'Text And Image', 'Featured Articles'];
    const [selectedComponentUid, setSelectedComponentUid] = useState(null);
    const [componentsData, setComponentsData] = useState(jsonData);
    const [selectedComponentStyles, setSelectedComponentStyles] = useState({});

    const handleComponentSelection = (uid, styles) => {
        setSelectedComponentUid(uid);
        setSelectedComponentStyles(styles);  // Set the styles of the selected component
    };

    const handleStyleChange = (newStyles) => {
        const updatedData = { ...componentsData };

        const updateStyles = (node) => {
            if (node.uid === selectedComponentUid) {
                node.styles = { ...node.styles, ...newStyles };
            }
            if (node.children) {
                node.children.forEach(updateStyles);
            }
        };

        updatedData.children.forEach(updateStyles);
        setComponentsData(updatedData);
    };

    // Function to trigger download of JSON file with updated data
    const saveJsonFile = () => {
        const updatedJson = JSON.stringify(componentsData, null, 2);
        const blob = new Blob([updatedJson], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'updatedComponentsData.json';
        link.click();
    };

    return (
        <div className={styles.uiBuilderContainer}>
            <LeftSidebar components={components} />
            <Canvas jsonData={componentsData} onComponentSelect={handleComponentSelection} />
            <RightSidebar
                onChange={handleStyleChange}
                selectedStyles={selectedComponentStyles}
                onSave={saveJsonFile}
            />
        </div>
    );
};

export default UIBuilder;
