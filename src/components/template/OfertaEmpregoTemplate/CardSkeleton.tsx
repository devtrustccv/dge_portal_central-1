import { Card, CardContent } from "@/components/atoms/card";
import Skeleton from "@/components/atoms/skeleton";

export default function CardSkeleton() {
  return (
    <Card className="flex w-auto shadow-none p-3 items-center gap-4 rounded-2xl border-[#BFC4CD] border-[0.5px] cursor-pointer relative">
      <Skeleton className="min-w-[141px] h-[150px] rounded-md" />
      <CardContent className="w-full h-[140px] grid grid-cols-1 gap-2">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
        <div className="flex flex-col justify-end items-end">
          <Skeleton className="w-[120px] h-10 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
