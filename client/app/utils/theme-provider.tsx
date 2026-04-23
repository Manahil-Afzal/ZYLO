'use client'

import * as React from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    resolvedTheme: Theme;
    setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = {
    children: React.ReactNode;
    attribute?: 'class' | 'data-theme';
    defaultTheme?: Theme;
    enableSystem?: boolean;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'theme';

export function ThemeProvider({
    children,
    attribute = 'class',
    defaultTheme = 'light',
    enableSystem = false,
}: ThemeProviderProps) {
    const [theme, setThemeState] = React.useState<Theme>(defaultTheme);

    React.useEffect(() => {
        const storedTheme = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;

        if (storedTheme === 'light' || storedTheme === 'dark') {
            setThemeState(storedTheme);
            return;
        }

        if (enableSystem && typeof window !== 'undefined') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setThemeState(prefersDark ? 'dark' : 'light');
            return;
        }

        setThemeState(defaultTheme);
    }, [defaultTheme, enableSystem]);

    React.useEffect(() => {
        const root = document.documentElement;

        if (attribute === 'class') {
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
        } else {
            root.setAttribute(attribute, theme);
        }

        localStorage.setItem(STORAGE_KEY, theme);
    }, [attribute, theme]);

    const setTheme = React.useCallback((value: Theme) => {
        setThemeState(value);
    }, []);

    const contextValue = React.useMemo(
        () => ({
            theme,
            resolvedTheme: theme,
            setTheme,
        }),
        [theme, setTheme],
    );

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}