import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function useDarkSide(): [string, Dispatch<SetStateAction<string>>] {
  const initialTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState<string>(initialTheme);

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
