"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { IQuestionario } from "@/services/homepage/type";

interface MobileTabsAccordionProps {

    selectedTab: string;
    setSelectedTab: (value: string) => void;
    questionarios_vos_kres: IQuestionario[]
}
export function MobileTabsAccordion({ questionarios_vos_kres, selectedTab, setSelectedTab }: MobileTabsAccordionProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="block md:hidden">
            <div className={`w-full border border-gray-300 relative overflow-hidden p-1.5 ${isOpen ? "rounded-[32px]" : "rounded-[38px]"}`}>
                <button
                    className="w-full flex gap-4 justify-center items-center font-medium px-6 h-[54px] text-xl text-white bg-[linear-gradient(90deg,#61C3A8_0%,#0454A0_100%)] rounded-full transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {questionarios_vos_kres?.find((c) => c.title === selectedTab)?.title}
                    <ChevronDown
                        className={cn(
                            "w-8 h-8 transition-transform duration-300",
                            isOpen ? "rotate-180" : "rotate-0"
                        )}
                    />
                </button>

                <div
                    className={cn(
                        "transition-all duration-500 ease-in-out overflow-hidden flex flex-col gap-4",
                        isOpen
                            ? "opacity-100 max-h-[300px] scale-y-100 mt-4"
                            : "opacity-0 max-h-0 scale-y-95 pointer-events-none"
                    )}
                >
                    {questionarios_vos_kres
                        .filter((category) => category.title !== selectedTab)
                        .map((category) => (
                            <button
                                key={category.title}
                                className="w-full flex gap-2 justify-center font-medium items-center px-6 py-4 text-xl text-main-black bg-transparent rounded-full transition hover:bg-[#F8FAFD]"
                                onClick={() => {
                                    setSelectedTab(category.title);
                                    setIsOpen(false);
                                }}
                            >
                                {category.title}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
}
