import React, { createContext, useContext, useState } from 'react';



export const PreferencesContext = createContext(null);


export function usePreferences() {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error('usePreferences must be used within a PreferencesProvider');
    }
    return context;
}


export function PreferencesProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [fontSize, setFontSize] = useState(16);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const updateFontSize = (size) => {
        setFontSize(size);
    };

    return (
        <PreferencesContext.Provider value={{ theme, toggleTheme, fontSize, updateFontSize }}>
            {children}
        </PreferencesContext.Provider>
    );
}


export function PreferencesPanel() {
    const { theme, toggleTheme, fontSize, updateFontSize } = usePreferences();

    return (
        <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
            <button onClick={toggleTheme} style={{ padding: '4px 8px', cursor: 'pointer' }}>
                Toggle Theme ({theme})
            </button>

            <span>Font size:</span>
            {[14, 16, 18].map(size => (
                <button
                    key={size}
                    onClick={() => updateFontSize(size)}
                    style={{
                        padding: '3px 6px',
                        fontWeight: fontSize === size ? 'bold' : 'normal',
                        cursor: 'pointer'
                    }}
                >
                    {size}px
                </button>
            ))}
        </div>
    );
}


export function Toolbar() {
    return (
        <div style={{ padding: '8px', borderBottom: '1px solid #ddd', marginBottom: '12px' }}>
            <PreferencesPanel />
        </div>
    );
}


export function ArticlePreview() {
    const { theme, fontSize } = usePreferences();

    return (
        <div style={{
            padding: '12px',
            fontSize: `${fontSize}px`,
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
            color: theme === 'light' ? '#000000' : '#ffffff'
        }}>
            <h3 style={{ margin: '0 0 8px 0' }}>Article Preview</h3>
            <p style={{ margin: 0 }}>
                Current Theme: <strong>{theme}</strong> | Font Size: <strong>{fontSize}px</strong>
            </p>
        </div>
    );
}


export function Dashboard() {
    const { theme } = usePreferences();

    return (
        <div style={{
            maxWidth: '450px',
            margin: '20px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: theme === 'light' ? '#fafafa' : '#222222',
            color: theme === 'light' ? '#000000' : '#ffffff'
        }}>
            <h2 style={{ marginTop: 0 }}>Dashboard</h2>
            <Toolbar />
            <ArticlePreview />
        </div>
    );
}

export default function ApplicationPreferencesApp() {
    return (
        <PreferencesProvider>
            <Dashboard />
        </PreferencesProvider>
    );
}
