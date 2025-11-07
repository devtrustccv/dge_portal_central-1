/*
// src/components/organisms/MobileSidebarFilter.tsx

import { SidebarFilter } from "@/components/molecules/FiltersBeta";
import { X } from "lucide-react";

interface MobileSidebarFilterProps {
    open: boolean;
    handleCloseFilter?: () => void;
    configs: Record<string, any> | undefined;
}

export function MobileSidebarFilter({
        open,
        handleCloseFilter,
        configs,
    }: MobileSidebarFilterProps) {

    if (!open) return null;
    console.log("========================");
    console.log({configs: configs});
    console.log("========================");

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex justify-end p-4">
                <button
                    onClick={handleCloseFilter} // Função de fechar o filtro
                    className="text-gray-800 text-lg font-bold"
                >
                    <X />
                </button>
            </div>
            <div className="flex-1 p-6">
                {configs && <SidebarFilter data={configs as any} />}
            </div>
        </div>
    );
}
*/
