'use client'
import {Table, TableBody, TableCell, TableRow} from "@/components/atoms/table";
import {IGetCSNQ} from "@/services/getDataSNQ/types/type";
import Link from "next/link";
import {PaginationComponent} from "@/components/atoms/PaginationComponent";
import {useState} from "react";

const per_page = 10;

export function NationalQualificationsCatalog({ data }: {data: IGetCSNQ | null | undefined}) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = data?.familia_profissional?.nodes?.length ?? 0;

    const paginatedData = data?.familia_profissional?.nodes.slice(
        (currentPage - 1) * per_page,
        currentPage * per_page
    );

    return (
        <div>
            <div className="flex-row md:flex justify-between mb-10 items-center">
                <h2 className="font-poppins font-medium text-[24px] md:text-[36px] text-[#334155] leading-9 md:leading-[56px] tracking-[0]">
                    {data?.section_catalogo?.title}
                </h2>

                {
                    data?.section_catalogo?.button && (
                        <Link
                            href={`${data?.section_catalogo?.button?.url} || /catalogo-nacional-qualificacoes`}
                            target={data?.section_catalogo?.button?.external_link ? '_blank' : '_self'}
                            className="w-full md:w-[230px] h-[40px] md:h-[44px] mt-2 text-[12px] flex justify-center items-center lg:w-[240px] bg-[#EFF2F5] rounded-[32px] font-poppins font-normal md:text-[16px] leading-[100%] tracking-[0%]">
                            {data?.section_catalogo?.button?.label}
                        </Link>
                    )
                }
            </div>
            <p>
                {data?.section_catalogo?.description}
            </p>
            <div className="py-10">
                <Table className="w-full overflow-hidden">
                    <TableBody>
                        {paginatedData?.map((item, index) => (
                            <TableRow
                                key={item?.documentId}
                                className={`border-none text-[#334155] ${index % 2 === 0 ? "bg-[#EFF2F5]" : "bg-white"}`}
                            >
                                <TableCell className="rounded-l-xl">{item.code}</TableCell>
                                <TableCell className="rounded-r-xl">{item.title}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {totalItems > per_page && (
                    <PaginationComponent
                        totalCountOfRegisters={totalItems}
                        registerPerPage={per_page}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )}
            </div>
        </div>
    );
}