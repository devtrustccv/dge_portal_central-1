import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface IDocumentNecessary {
    id?: number,
    label: string,
    url: string,
    file: {
        documentId: string,
        url: string
    },
}

export function RequiredDocuments({
      dataFindId,
      title,
      description
  }: {
    title?: string | undefined;
    description?: string | undefined;
    dataFindId: IDocumentNecessary[];
}) {

    return (
        <div className="container flex flex-col gap-2 md:gap-4">
            <div>
                <h2 className="font-poppins font-medium text-[24px] md:text-[36px] text-[#334155] leading-9 md:leading-[56px] tracking-[0]">
                    {title}
                </h2>
                {description && (
                    <div className="mt-8 text-[#616E85] text-[14px] md:text-base text-editor"
                         dangerouslySetInnerHTML={{__html: description || ""}
                         }
                    />
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:justify-between gap-4 w-auto h-auto mt-5">
            {dataFindId?.map((item, index) => (
                <div
                    key={item?.id ?? `fallback-key-${index}`}
                    className="flex justify-between h-[59px] md:h-auto w-auto p-[16px] pr-[16px] pl-[24px] items-center gap-[10px] rounded-[16px] border border-[#BFC4CD] bg-white"
                >
                    <button className="text-[#616E85] text-[14px] md:text-base">
                        {item?.label}
                    </button>
                    {(item?.url || item?.file?.url) && (
                        <Link
                            href={item?.url || item?.file?.url || '#'}
                            target="_blank"
                            className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] bg-[rgba(4,84,160,0.10)]"
                        >
                            <Eye/>
                        </Link>
                    )}
                </div>
            ))}
            </div>
        </div>
    );
}
