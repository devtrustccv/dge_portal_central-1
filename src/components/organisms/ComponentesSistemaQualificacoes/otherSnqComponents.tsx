import {IGetCSNQ} from "@/services/getDataSNQ/types/type";
import Link from "next/link";

export function OtherSnqComponents({data}: {data: IGetCSNQ | null | undefined}){
    return(
        <div>
            <h1 className="font-poppins font-medium text-[24px] md:text-[36px] text-[#334155] leading-9 md:leading-[56px] tracking-[0]">
                {data?.outros_componentes?.outros_title}
            </h1>

            <div className="grid md:grid-cols-1 py-10 lg:grid-cols-2 w-full gap-4">
                {data?.outros_componentes?.componentes?.map(item => (
                    <div key={item?.id} className="h-full flex flex-col border rounded-2xl px-6 py-6">

                        <div className="flex-1 flex flex-col gap-3">
                            <h2 className="text-[#334155]">{item?.title}</h2>
                            <p className="leading-7 text-[#616E85]">{item?.description}</p>
                        </div>


                        <div className="flex justify-end mt-auto">
                            {item?.button && (
                                <Link
                                    href={`${item?.button?.url || ''}`}
                                    target={item?.button?.external_link ? '_blank' : '_self'}
                                    className="w-28 h-8 py-2.5 px-4 text-white text-[14px] flex justify-center items-center bg-[#2470B8] rounded-[8px]">
                                    {item?.button?.label}
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}