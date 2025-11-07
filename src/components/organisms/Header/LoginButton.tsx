"use client";

import React from "react";
import { useNavigation } from "@/context/NavigationContext";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/atoms/dropdown-menu";
import Icon from "@/components/atoms/Icons";
import { LogOut } from "lucide-react";
import { setCookie } from "nookies";
import { usePathname, useSearchParams } from "next/navigation";
import { logout } from "@/app/auth/actions";
import Link from "next/link";


export function AuthMenu() {
    const { hasSession, user, setUser, setHasSession } = useNavigation();
    const searchParams = useSearchParams();
    const path = usePathname();

    const handleLogin = () => {
        const redirectPath = `${process.env.NEXT_PUBLIC_SITE_URL}${path}${searchParams ? `?${searchParams.toString()}` : ""
            }`;
        setCookie(null, "redirect_path", redirectPath, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
        const callbackUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
        const loginUrl = `${process.env.NEXT_PUBLIC_CENTRAL_BASE_URL}/api/auth/external/login?redirectUrl=${encodeURIComponent(callbackUrl)}`;
        window.location.href = loginUrl;
    };

    const handleLogout = () => {
        logout();
        setUser(undefined);
        setHasSession(false);
        const callbackUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
        const logoutUrl = `${process.env.NEXT_PUBLIC_CENTRAL_BASE_URL}/api/auth/external/logout?redirectUrl=${encodeURIComponent(callbackUrl)}`;
        window.location.href = logoutUrl;
        // window.location.reload();
    };

    if (!hasSession) {
        return (
            <button onClick={handleLogin} className="hover:text-primary">
                <Icon name="user" />
            </button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="hover:text-primary focus:outline-none focus:ring-0">
                    <Icon name="user" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                align="end"
                sideOffset={4}
                avoidCollisions={true}
                collisionPadding={8}
            >
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/perfil">
                    <DropdownMenuItem>
                        <Icon name="user" className="mr-2 h-4 w-4" />
                        <span>{user?.name || "Conta"}</span>
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}
