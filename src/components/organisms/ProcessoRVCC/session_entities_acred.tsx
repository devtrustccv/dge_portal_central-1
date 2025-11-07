import Image from "next/image";
import {ISessionEntity} from "@/services/getDataProcessoRVCC/types/type";

export default function SectionEntitiesAcreditada({data} : {data: ISessionEntity | undefined}) {

    return (
        <section className="h-auto md:h-[623px] bg-[#F8FAFC] w-full mt-32 mb-28">
            <div className="container flex flex-col h-full max-w-[1430px] p-24 items-center gap-10 md:gap-8 lg:gap-8">
                <h1 className="w-[400px] md:w-full flex justify-center font-poppins font-medium text-[20px] md:text-[36px] text-[#334155] tracking-[0]">
                    {data?.title}
                </h1>
                <Image
                    src={data?.image?.url || ''}
                    width={371}
                    height={121}
                    alt={""}
                    sizes="(max-width: 371px) 100vw, 371px"
                />
                <div className="text-center w-[400px] text-editor"
                   dangerouslySetInnerHTML={
                       { __html: data?.description || ""}
                   }
                />
                <button className="rounded-[38px] w-[127px] md:w-[154px] h-[40px] md:h-[43px] bg-main-blue text-white text-[16px]">
                    {data?.acion?.label || "Saiba Mais"}
                </button>
            </div>
        </section>

    );
}