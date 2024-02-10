import { useEffect } from 'react';

const useSystemTheme = () => {
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e) => {
      document.body.classList.toggle('dark-theme', e.matches);
    };

    handleSystemThemeChange(prefersDarkMode);
    prefersDarkMode.addEventListener('change', handleSystemThemeChange);

    return () => {
      prefersDarkMode.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);
};

export default useSystemTheme;
