"use client";

import { useNavigation } from "@/context/NavigationContext";
import { useEffect } from "react";

interface ThemeSetterProps {
    theme: "dark" | "light";
}

export function ThemeSetter({ theme }: ThemeSetterProps) {
    const { setHeaderTheme } = useNavigation();

    useEffect(() => {
        setHeaderTheme(theme);
    }, [theme, setHeaderTheme]);

    return null;
}
