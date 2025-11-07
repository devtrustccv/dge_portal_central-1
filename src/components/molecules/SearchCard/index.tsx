"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/atoms/input";
import Icon from "@/components/atoms/Icons";
import { useDebouncedCallback } from "use-debounce";
import { ListFilter } from "lucide-react";
import { SidebarFilter } from "@/components/molecules/FiltersBeta";
{/* Add to Kevin Sousa */}
interface SearchCardGlobalProps {
    configs: any;
}

export function SearchCard({ configs }: SearchCardGlobalProps) {
    const [isMobile, setIsMobile] = useState(false); {/* Add to Kevin Sousa */}

    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleSearch = useDebouncedCallback((query) => {
        const params = new URLSearchParams(searchParams);
        params.delete("page");
        if (query) {
            params.set("search", query);
        } else {
            params.delete("search");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    {/* Add to Kevin Sousa */}
    const handleOpenFilter = () => setIsMobile(true);
    const handleCloseFilter = () => setIsMobile(false);

    return (
        <div className="flex justify-between items-center gap-5 relative mt-8 mb-3 mr-3 md:mr-0">
            <div className="relative w-full">
                <Input
                    type="text"
                    placeholder="Faz a tua pesquisa aqui..."
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    className="flex-1 h-[56px] rounded-full pl-14"
                    defaultValue={searchParams.get("search") || ""}
                />
                <Icon name="search" className="absolute top-1/2 left-4 -translate-y-1/2" />
            </div>

            {/* Add to Kevin Sousa */}
            <div className="lg:hidden md:right-[30px] md:top-[450px] border border-[#BFC4CD] rounded-full p-2 w-12 h-12 flex justify-center items-center">
                <button onClick={handleOpenFilter} className="flex text-[#616E85] justify-center items-center px-2">
                    <ListFilter size={30} />
                </button>
            </div>
            {/* Add to Kevin Sousa */}
            {isMobile && (
                <SidebarFilter
                    data={configs}
                    isMobile={isMobile}
                    onCloseMobile={handleCloseFilter}
                />
            )}
        </div>
    );
}
