import React from 'react'
import { Card, CardContent } from "@/components/atoms/card";
import Icon from '@/components/atoms/Icons';
import { IServiceNode } from '@/services/services/type';
interface ServiceItemProps extends IServiceNode {
    style?: "default" | "bg-gray" | "border";
}
export function ServiceItem({ title, style = "default" }: ServiceItemProps) {
    return (

        <Card
            className={`px-6 py-[22px] h-full ${style === "bg-gray" ? "bg-[#F8FAFC] rounded-[24px] " : style === "border" ? " border-[0.5px] border-[#BFC4CD] rounded-[24px] " : ""} flex items-center gap-3 shadow-none transition-shadow duration-500 ease-in-out hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]`}
        >
            <div className="w-10 h-10 bg-main-black rounded-full flex items-center justify-center">
                <Icon name={"paper-plane"} className="text-white" />
            </div>
            <CardContent className="p-0 flex-1 text-foreground text-[#616E85] text-[14px] md:text-base">
                {title}
            </CardContent>
        </Card>

    )
}
