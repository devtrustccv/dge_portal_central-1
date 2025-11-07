import {Card} from "@/components/atoms/card";
import Link from "next/link";


interface ApoioProps{
    apoio : {
        title : string;
        description : string;
        slug : string;
        image : string;
    }[]
}

const  ApoioLista: React.FC<ApoioProps>=({apoio})=>{
    return(
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
            {apoio?.map((item, index)=>(
                <Card key={index} className="w-full border-[0.5px] bg-white flex p-4 gap-2 shadow-none">


                    <div
                        className="bg-no-repeat bg-contain bg-center w-[141px] sm:w-[120px] md:w-[141px] min-w-[120px] shrink-0 h-[150px] rounded-[8px] bg-[#EFF2F5]"
                        style={{backgroundImage: `url(${item.image || "/logotipos.svg"})`}}
                    ></div>

                    <div className="flex flex-col w-full justify-between gap-2">
                        <div>
                            <h1 className="font-poppins font-normal text-[14px] md:text-[16px] text-[#0D1421] leading-[24px] tracking-[0%]">
                                {item?.title}
                            </h1>
                            <p className="mt-2 font-poppins font-normal text-[12px] md:text-[14px] text-[#616E85] leading-[22px] tracking-[0%] line-clamp-3">
                                {item?.description}
                            </p>
                        </div>


                        <Link href={`/apoio-incentivo/${item?.slug}`} className="flex justify-end">
                            <button
                                className="bg-[#0454A0] text-white w-[109px] h-[28px] py-3 px-4 rounded-[8px] flex justify-center items-center">
                                Ver mais
                            </button>
                        </Link>
                    </div>
                </Card>
            ))}

        </div>
    )
}
export default ApoioLista;