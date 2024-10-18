import React, { useState, useEffect } from 'react';
import styles from '../styles/RightSidebar.module.css';

const RightSidebar = ({ onChange, selectedStyles, onSave }) => {
    const [backgroundColor, setBackgroundColor] = useState('');
    const [color, setColor] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [fontSize, setFontSize] = useState('');

    // Populate form inputs with selected component's styles when component is clicked
    useEffect(() => {
        if (selectedStyles) {
            setBackgroundColor(selectedStyles.backgroundColor || '');
            setColor(selectedStyles.color || '');
            setHeight(selectedStyles.height || '');
            setWidth(selectedStyles.width || '');
            setFontSize(selectedStyles.fontSize || '');
        }
    }, [selectedStyles]);

    const handleChange = (e, setState, key) => {
        setState(e.target.value);
        onChange({ [key]: e.target.value });
    };

    return (
        <div className={styles.sidebar}>
            <h3>Design & Data</h3>
            <label>
                Background color:
                <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => handleChange(e, setBackgroundColor, 'backgroundColor')}
                />
            </label>
            <label>
                Text color:
                <input
                    type="text"
                    value={color}
                    onChange={(e) => handleChange(e, setColor, 'color')}
                />
            </label>
            <label>
                Height:
                <input
                    type="text"
                    value={height}
                    onChange={(e) => handleChange(e, setHeight, 'height')}
                />
            </label>
            <label>
                Width:
                <input
                    type="text"
                    value={width}
                    onChange={(e) => handleChange(e, setWidth, 'width')}
                />
            </label>
            <label>
                Font size:
                <input
                    type="text"
                    value={fontSize}
                    onChange={(e) => handleChange(e, setFontSize, 'fontSize')}
                />
            </label>
            <button onClick={onSave}>Save</button>
        </div>
    );
};

export default RightSidebar;
