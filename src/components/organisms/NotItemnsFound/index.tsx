import { Inbox } from "lucide-react";

interface NoItemsFoundProps {
    title?: string;
    description?: string;
}

export function NoItemsFound({ title, description }: NoItemsFoundProps) {
    return (
        <div className="flex flex-col items-center justify-center bg-background bg-neutral-50 w-full px-4 py-7 rounded-3xl border border-dashed">
            <div className="text-center">
                <div className="bg-white rounded-full p-4 inline-block mb-6 border border-dashed">
                    <Inbox className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                {description && <p className="text-muted-foreground">{description}</p>}
            </div>
        </div>
    );
}
