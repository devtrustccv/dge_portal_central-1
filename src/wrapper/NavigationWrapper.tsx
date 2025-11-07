"use client";

import { NavigationProvider } from "@/context/NavigationContext";
import React from "react";

interface NavigationWrapperProps {
    children: React.ReactNode;
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
    return <NavigationProvider>{children}</NavigationProvider>;
}
