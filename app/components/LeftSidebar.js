import React, { createElement } from 'react';
import styles from '../styles/LeftSidebar.module.css';
import { components } from '../userComponents/index.js';

const LeftSidebar = () => {
    return (
        <div className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Available Components</h3>
            <ul>
                {Object.keys(components).map((key, index) => (
                    <li key={index} className={styles.componentItem}>
                        <h4>{components[key].name}</h4>
                        <div className={styles.componentPreview}>
                            {createElement(components[key].component, components[key].defaultProps)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeftSidebar;
