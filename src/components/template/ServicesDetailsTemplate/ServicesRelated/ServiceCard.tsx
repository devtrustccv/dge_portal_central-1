import { Button } from "@/components/atoms/button";
import { IServiceNode } from "@/services/services/type";

interface ServiceCardProps extends IServiceNode {
}

export function ServiceCard({ title}: ServiceCardProps) {
    return (
        <div
            className="block rounded p-4 transition-shadow bg-[#F8FAFC] hover:bg-[#F8FAFC]/90"
        >
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <Button className="" size={"sm"}> 

            </Button>
        </div>
    );
}
