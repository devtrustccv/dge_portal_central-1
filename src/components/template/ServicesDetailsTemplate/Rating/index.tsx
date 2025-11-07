import { Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/atoms/tooltip";

interface RatingProps {
    rating: number; 
    totalReviews: number; 
}

export function Rating({ rating, totalReviews }: RatingProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="relative flex items-center gap-1 cursor-pointer">
                        {Array.from({ length: 5 }, (_, i) => {
                            const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100; 

                            return (
                                <div key={i} className="relative w-6 h-6">
                                    <Star size={24} className="absolute text-gray-200" />
                                    <div
                                        className="absolute top-0 left-0 h-full overflow-hidden"
                                        style={{ width: `${fillPercentage}%` }}
                                    >
                                        <Star size={24} className=" fill-gray-200 text-gray-200" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm">
                    {rating.toFixed(1)} • {totalReviews} avaliações
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
