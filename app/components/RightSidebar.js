import React, { useState, useEffect } from 'react';
import styles from '../styles/RightSidebar.module.css';

const RightSidebar = ({ onChange, selectedStyles, selectedComponent }) => {
    const [backgroundColor, setBackgroundColor] = useState('');
    const [color, setColor] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [fontSize, setFontSize] = useState('');
    const [dataFields, setDataFields] = useState({});

    useEffect(() => {
        if (selectedStyles) {
            setBackgroundColor(selectedStyles.backgroundColor || '');
            setColor(selectedStyles.color || '');
            setHeight(selectedStyles.height || '');
            setWidth(selectedStyles.width || '');
            setFontSize(selectedStyles.fontSize || '');
        }
        if (selectedComponent) {
            setDataFields(selectedComponent.props || {});
        }
    }, [selectedStyles, selectedComponent]);

    const handleChange = (e, setState, key) => {
        setState(e.target.value);
        const updatedStyles = {
            ...selectedStyles,
            [key]: e.target.value
        };
        onChange({ styles: updatedStyles });
    };

    const handleDataFieldChange = (e, field) => {
        const updatedFields = { ...dataFields, [field]: e.target.value };
        setDataFields(updatedFields);
        onChange({ props: updatedFields });
    };

    return (
        <div className={styles.sidebar}>
            <h3>Design Tab</h3>

            <div className={styles.inputGroup}>
                <label>Background color:</label>
                <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => handleChange(e, setBackgroundColor, 'backgroundColor')}
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Text color:</label>
                <input
                    type="text"
                    value={color}
                    onChange={(e) => handleChange(e, setColor, 'color')}
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Height:</label>
                <input
                    type="text"
                    value={height}
                    onChange={(e) => handleChange(e, setHeight, 'height')}
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Width:</label>
                <input
                    type="text"
                    value={width}
                    onChange={(e) => handleChange(e, setWidth, 'width')}
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Font size:</label>
                <input
                    type="text"
                    value={fontSize}
                    onChange={(e) => handleChange(e, setFontSize, 'fontSize')}
                />
            </div>

            <h3>Data Tab</h3>
            <div className={styles.dataTab}>
                <label>Component Data Fields:</label>

                {selectedComponent && selectedComponent.props && Object.keys(selectedComponent.props).map((propKey) => (
                    <div key={propKey} className={styles.inputGroup}>
                        <label>{propKey}:</label>
                        <input
                            type="text"
                            value={dataFields[propKey] || ''}
                            onChange={(e) => handleDataFieldChange(e, propKey)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightSidebar;
