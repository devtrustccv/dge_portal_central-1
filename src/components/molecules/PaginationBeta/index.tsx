import {PaginationItem} from "./PaginationItem";
import {NextOrPreview} from "./NextOrPreview";

const siblingsCount = 2;
export type PaginationProps = {
    totalCountOfRegisters: number;
    registerPerPage?: number;
    currentPage?: number;
    searchParams?: { [key: string]: string | string[] | undefined };
};

function genaratePagesArray(from: number, to: number) {
    return [...new Array(to - from)].map((_, index) => {
            return from + index + 1;
        }).filter((page) => page > 0);
}

export function Pagination({
   totalCountOfRegisters,
   registerPerPage = 2,
   currentPage = 1,
   searchParams,
}: PaginationProps) {
    const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage);

    const previousPages = currentPage > 1 ? genaratePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : [];

    const nextPages = currentPage < lastPage ? genaratePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : [];

    return (
        <div className="flex justify-center items-center gap-6 mt-24 w-full">
            <div className="flex gap-2">

                <NextOrPreview
                    currentPage={currentPage}
                    lastPage={lastPage}
                    searchParams={searchParams}
                    type="PREVIEW"
                />

                <div className="flex rounded-full gap-2 text-color-gray-50">
                    {currentPage > 1 + siblingsCount && (
                        <>
                            <PaginationItem
                                searchParams={searchParams}
                                number={1}
                                isActive={false}
                            />
                            {currentPage > 2 + siblingsCount && (
                                <span className="h-full pt-1">...</span>
                            )}
                        </>
                    )}

                    {/* Exemplo < 1 ... 4 5 [6] 7 8 ... >  valor [4, 5] são gerado pela funçao genaratePagesArray*/}
                    {previousPages.length > 0 &&
                        previousPages.map((page) => {
                            return (
                                <PaginationItem
                                    searchParams={searchParams}
                                    key={page}
                                    number={page}
                                    isActive={false}
                                />
                            );
                        }
                    )}

                    {/* Exemplo < [1] 2 3 ... 5 */}
                    <PaginationItem
                        searchParams={searchParams}
                        number={currentPage}
                        isActive
                    />

                    {/* Exemplo < 1 ... 4 5 [6] 7 8 ... > valor [7, 8] são gerado pela funçao genaratePagesArray*/}
                    {nextPages.length > 0 &&
                        nextPages.map((page) => {
                            return (
                                <PaginationItem
                                    searchParams={searchParams}
                                    key={page}
                                    number={page}
                                    isActive={false}
                                />
                            );
                        }
                    )}

                    {currentPage + siblingsCount < lastPage && (
                        <>
                            {currentPage + 1 + siblingsCount < lastPage && (
                                <span className="h-full pt-1">...</span>
                            )}

                            <PaginationItem
                                searchParams={searchParams}
                                number={lastPage}
                                isActive={false}
                            />
                        </>
                    )}
                </div>

                <NextOrPreview
                    currentPage={currentPage}
                    lastPage={lastPage}
                    searchParams={searchParams}
                    type="NEXT"
                />

            </div>
        </div>
    );
}
