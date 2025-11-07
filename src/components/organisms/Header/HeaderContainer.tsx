"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MobileMenuSheet } from "./MobileMenuSheet";
import { IMenuData } from "@/services/header/type";
import { ScrollArea } from "../../atoms/scroll-area";
import { useNavigation } from "@/context/NavigationContext";
import Image from "next/image";
import { ISiteInfo } from "@/services/site-info/type";
import { AuthMenu } from "./LoginButton";
import { SearchGlobalBtn } from "./SearchGlobalBtn";

interface IHeaderContainerProps extends IMenuData, ISiteInfo { }

export function HeaderContainer({ menuGroups, logo, logo_white }: IHeaderContainerProps) {
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // esconde após 3s
    };

    const { headerTheme } = useNavigation();
    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [headerVisible, setHeaderVisible] = useState(true);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const prevScrollY = useRef(0);

    const handleMouseEnter = (idx: number) => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setOpenMenu(idx);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => setOpenMenu(null), 50);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 50);

            if (currentScrollY === 0) {
                setHeaderVisible(true);
            } else if (currentScrollY < prevScrollY.current) {
                setHeaderVisible(true);
            } else if (currentScrollY > prevScrollY.current) {
                setHeaderVisible(false);
            }
            prevScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        };
    }, []);

    return (
        <motion.header
            initial={{ height: 120, backgroundColor: "rgba(255,255,255,0)", y: 0 }}
            animate={{
                height: scrolled ? 98 : 120,
                backgroundColor: scrolled || openMenu !== null ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
                y: headerVisible ? 0 : -120,
            }}
            transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
            }}
            className={`fixed top-0 left-0 w-full z-50 ${headerTheme === "light" && !scrolled && openMenu === null ? "text-white" : "text-main-black"
                }`}
        >
            <div className="relative w-full h-full">
                {showAlert && (
                    <div className="fixed top-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow z-50 transition-all duration-300">
                        ⚠️ Serviço brevemente disponível.
                    </div>
                )}
                <div className="container mx-auto flex items-center justify-between gap-6 h-full">
                    {logo?.url && (
                        <Link href="/" className={`${headerTheme === "light" && !scrolled && openMenu === null ? "hidden" : ""}`}>
                            <Image width={191} height={53} src={logo?.url} alt="logo" 
                                sizes="(max-width: 768px) 100vw, 264px"
                            />
                        </Link>
                    )}
                    {logo_white?.url && (
                        <Link href="/" className={`${headerTheme === "light" && !scrolled && openMenu === null ? "" : "hidden"}`}>
                            <Image width={191} height={53} src={logo_white?.url} alt="logo" 
                                sizes="(max-width: 768px) 100vw, 264px"
                            />
                        </Link>
                    )}

                    <nav className="hidden lg:flex">
                        <ul className="flex items-center space-x-3 3xl:space-x-6">
                            {menuGroups?.map((group, idx) => {
                                const isHovered = openMenu === idx;
                                const baseTextClass = headerTheme === "light" && !scrolled ? "" : "text-main-black";

                                const finalClass = isHovered
                                    ? "text-primary"
                                    : `${baseTextClass} ${openMenu !== null || headerTheme === "dark"
                                        ? "text-main-black"
                                        : `${scrolled ? "" : "text-white"}`
                                    } hover:text-primary`;

                                return (
                                    <li
                                        key={idx}
                                        onMouseEnter={() =>
                                            group?.menus && group?.menus?.length > 0 ? handleMouseEnter(idx) : {}
                                        }
                                        onMouseLeave={handleMouseLeave}
                                        className=""
                                    >
                                        {group?.url ? (
                                            <Link href={group.url}>
                                                <span className={`cursor-pointer  transition-colors py-6 ${finalClass}`}>
                                                    {group.name}
                                                </span>
                                            </Link>
                                        ) : (
                                            <span className={`cursor-pointer  py-6 transition-colors ${finalClass}`}>
                                                {group.name}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <SearchGlobalBtn />
                        <AuthMenu />
                        <MobileMenuSheet menuGroups={menuGroups} />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {openMenu !== null &&
                        menuGroups[openMenu]?.menus &&
                        menuGroups[openMenu].menus.length > 0 && (
                            <motion.div
                                onMouseEnter={() => {
                                    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                                }}
                                onMouseLeave={handleMouseLeave}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 200,
                                    duration: 0.2,
                                }}
                                className="absolute top-[80%] left-0 w-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.05)] z-50"
                                style={{ marginTop: "-1px" }}
                            >
                                <ScrollArea maxH="76vh" className="!h-auto">
                                    <div className={`container mx-auto grid grid-cols-3 ${menuGroups[openMenu].menus?.length == 3 ? "lg:grid-cols-3" : menuGroups[openMenu].menus?.length == 4 ? "lg:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-4 xl:grid-cols-5"}  gap-16 px-8 pt-16 pb-24`}>
                                        {menuGroups[openMenu].menus.map((menu, mIdx) => (
                                            <div key={mIdx} className="w-full">
                                                <h3 className="mb-6 font-semibold text-[#0D1421] uppercase">
                                                    {menu.name}
                                                </h3>
                                                <ul className="space-y-4">
                                                    {menu?.submenus?.map((sub, sIdx) => (
                                                        <li key={sIdx} onClick={() => setOpenMenu(null)} className="flex flex-col gap-4">
                                                            {sub.url ?
                                                                <Link href={sub.url}>
                                                                    <span className="block hover:text-primary transition ">
                                                                        {sub.name}
                                                                    </span>
                                                                </Link>
                                                                :
                                                                <Link href={sub.url} onClick={handleClick}>
                                                                    <span className="block hover:text-primary transition ">
                                                                        {sub.name}
                                                                    </span>
                                                                </Link>
                                                            }

                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </motion.div>
                        )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}
