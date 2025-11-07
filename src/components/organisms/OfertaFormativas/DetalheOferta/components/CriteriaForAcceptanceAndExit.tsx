import {ISaidaProfissional} from "@/services/ofertas/types";

export function CriteriaForAcceptanceAndExit({
 dataFindId,
 title,
 description
}: {
    dataFindId: ISaidaProfissional[] | undefined
    title: string
    description?: string
}) {
    return (
        <div className="container mb-16">
            {dataFindId && dataFindId?.length > 0 && (
                <>
                    <div className="py-4">
                        <h2 className="text-[20px] md:text-[36px] text-[#334155] font-[500] leading-[30px] font-poppins">
                            {title}
                        </h2>
                        <p key={description} className="mt-10 leading-10 w-auto text-sm md:text-[16px]">
                            {description}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {
                            dataFindId?.map(item => (
                                <div key={item?.id}
                                     className="w-auto h-[72px] rounded-[20px] bg-[#F8FAFC] flex items-center px-7">
                                       <span className="px-5 border-l-2 border-[#2470B8] text-sm md:text-[16px]"
                                             dangerouslySetInnerHTML={
                                                 {__html: item.label}
                                             }
                                       />
                                </div>
                            ))
                        }
                    </div>
                </>
            )}
        </div>
    );
}

/*
import {IOfertaFormativa} from "@/services/ofertas/types";

export function CriteriaForAcceptanceAndExit({
                                                 dataFindId,
                                                 title,
                                                 description
                                             }: {
    dataFindId: IOfertaFormativa[]
    title: string
    description?: string
}) {
    return (
        <div>
            {dataFindId?.map(item => item?.saidas_profissionais.length > 0 && (
                <div key={item?.documentId} className="container mt-24">
                    <div className="">
                        <div className="py-4">
                            <h2 className="text-[20px] md:text-[36px] text-[#334155] font-[500] leading-[30px] font-poppins">
                                {title}
                            </h2>
                            {/!* {dataFindId?.map(item => (
                                <p key={item?.saida_profissional_desc}
                                   className="mt-10 leading-10 w-auto text-sm md:text-[16px]">
                                    {item?.saida_profissional_desc}
                                </p>
                            ))}*!/}
                            <p key={description} className="mt-10 leading-10 w-auto text-sm md:text-[16px]">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div>
                        {
                            dataFindId?.map(item => (
                                <div key={item?.documentId} className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-72">
                                    {item?.saidas_profissionais?.map(value => (
                                        <div key={value.id}
                                             className="w-auto h-[72px] rounded-[20px] bg-[#F8FAFC] flex items-center px-7">
                                       <span className="px-5 border-l-2 border-[#2470B8] text-sm md:text-[16px]"

                                             dangerouslySetInnerHTML={
                                                 {__html: value.label}
                                             }
                                       />
                                        </div>
                                    ))}
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}*///
