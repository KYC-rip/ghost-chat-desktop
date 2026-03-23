import { useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';

export function useTheme() {
  const [resolvedTheme, setResolvedTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const cycleTheme = () => {
    setResolvedTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return {
    resolvedTheme,
    cycleTheme,
  };
}
