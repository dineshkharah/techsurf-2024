import React, { useState } from 'react';
import LeftSidebar from '../app/components/LeftSidebar';
import Canvas from '../app/components/Canvas';
import RightSidebar from '../app/components/RightSidebar';
import styles from '../app/styles/UIBuilder.module.css';
import jsonData from '../app/userComponents/something.json';

const UIBuilder = () => {
    const components = ['Teaser', 'Card Collection', 'Text And Image', 'Featured Articles'];
    const [selectedComponentUid, setSelectedComponentUid] = useState(null);
    const [componentsData, setComponentsData] = useState(jsonData);
    const [selectedComponentStyles, setSelectedComponentStyles] = useState({});
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleComponentSelection = (uid, styles, component) => {
        setSelectedComponentUid(uid);
        setSelectedComponentStyles(styles);  // Set the styles of the selected component
        setSelectedComponent(component); // Set the selected component data
    };

    const handleStyleChange = (newStyles) => {
        const updatedData = { ...componentsData };

        const updateStyles = (node) => {
            if (node.uid === selectedComponentUid) {
                node.styles = { ...node.styles, ...newStyles.styles };
                node.props = { ...node.props, ...newStyles.props };
            }
            if (node.children) {
                node.children.forEach(updateStyles);
            }
        };

        updatedData.children.forEach(updateStyles);
        setComponentsData(updatedData);
    };

    return (
        <div className={styles.uiBuilderContainer}>
            <LeftSidebar components={components} />
            <Canvas
                jsonData={componentsData}
                onComponentSelect={(uid, styles, component) => handleComponentSelection(uid, styles, component)}
            />
            <RightSidebar
                onChange={handleStyleChange}
                selectedStyles={selectedComponentStyles}
                selectedComponent={selectedComponent} // Passing the selected component to RightSidebar
            />
        </div>
    );
};

export default UIBuilder;
