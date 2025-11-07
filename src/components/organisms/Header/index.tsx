import React from "react";
import { getMenuData } from "@/services/header/getMenuData";
import { HeaderContainer } from "./HeaderContainer";
import { getSiteInfo } from "@/services/site-info/getSiteInfo";

export async function Header() {
    const [siteInfo, menuData] = await Promise.all([getSiteInfo(), getMenuData()]);

    if (!menuData || !siteInfo) return <></>;

    return (
        <HeaderContainer {...menuData} {...siteInfo} />
    );
}
