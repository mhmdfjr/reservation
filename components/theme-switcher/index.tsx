"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>("system");
  const themes = ["light", "dark", "system"];

  const applyTheme = (selectedTheme: string) => {
    document.documentElement.classList.remove("light", "dark");
    if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (selectedTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.add(prefersDark ? "dark" : "light");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      setTheme("system");
      applyTheme("system");
    }
  }, []);

  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);

      return () =>
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, [theme]);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      className="fixed right-6 bottom-10 w-14 aspect-square rounded-full bg-brand-base text-basic-white dark:text-basic-black flex justify-center items-center"
      onClick={toggleTheme}
    >
      {theme === "light" && (
        <FontAwesomeIcon icon={faMoon} style={{ fontSize: "24px" }} />
      )}
      {theme === "dark" && (
        <FontAwesomeIcon icon={faDesktop} style={{ fontSize: "24px" }} />
      )}
      {theme === "system" && (
        <FontAwesomeIcon icon={faSun} style={{ fontSize: "24px" }} />
      )}
    </button>
  );
}
