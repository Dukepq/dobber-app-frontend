import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null)

export function ThemeProvider( { children }) {
    const [theme, setTheme] = useState(() => {
        const storedTheme = JSON.parse(window.localStorage.getItem("DOBBER_SELECTED_THEME"))
        return storedTheme ? storedTheme : "dark"
    })
    useEffect(() => {
        window.localStorage.setItem("DOBBER_SELECTED_THEME", JSON.stringify(theme))
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => theme === "dark" ? "light" : "dark")
    }
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}