import { useDroppable } from "@dnd-kit/core";
import { DraggableCard } from "./DraggableCard";
import { cn } from "@/lib/utils";

export function Dropzone({ id, title, curso }: { id: string; title: string; curso: any }) {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
        <div
            ref={setNodeRef}
            className={cn(
                "h-full flex flex-col items-center justify-center transition-all p-4 rounded-[20px]",
                isOver && "bg-gray-100"
            )}
        >
            {<div>
                <h3 className="font-medium mb-2 px-16 pb-1">{title}</h3>
            </div>}
            {curso ? <DraggableCard id={id} curso={curso} /> : <p className="text-gray-500">Arraste um curso aqui</p>}
        </div>
    );
}