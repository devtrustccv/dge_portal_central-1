import { Eye } from "lucide-react";
import Link from "next/link";

export interface IDocumentNecessary {
    id?: number;
    label: string;
    url: string;
    file: {
        documentId: string;
        url: string;
    };
}

export function DocumentsBetaTest({
                                      dataFindId,
                                      title,
                                  }: {
    title: string;
    dataFindId: IDocumentNecessary[] | undefined;
}) {
    return (
        <div className="container flex flex-col gap-10 py-10">
            <h2 className="text-[26px] md:text-[36px] w-auto font-[500] leading-[30px] text-[#334155] font-poppins">
                {title}
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 lg:justify-between gap-4 w-auto h-auto">
                {dataFindId?.map((item, index) => (
                    <div
                        key={item?.file?.documentId || item?.id || `fallback-${index}`} // Garantindo chave única
                        className="flex justify-between w-auto p-[16px] pr-[16px] pl-[24px] items-center gap-[10px] rounded-[16px] border border-[#BFC4CD] bg-white"
                    >
                        <button
                            dangerouslySetInnerHTML={{
                                __html: item?.label || "",
                            }}
                        />
                        {(item?.url || item?.file?.url) && (
                            <Link
                                href={item?.url || item?.file?.url}
                                target="_blank"
                                className="w-[40px] h-[40px] flex items-center justify-center rounded-[8px] bg-[rgba(4,84,160,0.10)]"
                            >
                                <Eye />
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
