import {Separator} from "@/components/atoms/separator";
import {Card} from "@/components/atoms/card";
import {Plus} from "lucide-react";
import Link from "next/link";
import {ICatalogoDataMeilli} from "@/components/template/CatalogoNacionalTemplate";

interface ListaCatalogoNationalProps {
    styles?: {
        container?: string;
        card?: string;
        nivel?: string;
        separator?: string;
        title?: string;
        area?: string;
    };
    isButton: boolean
    data: ICatalogoDataMeilli[]
}

export function ListaCards({
   styles = {},
   data,
   isButton = false,
}: ListaCatalogoNationalProps) {


    return (
        <div className="py-6 pr-3 lg:pr-0 grid grid-cols-1 gap-y-4">
            {data?.map((item: any) => (
                <Card
                    key={item?.documentId}
                    className="flex flex-col md:flex-row gap-3 sm:gap-6 items-start sm:items-center min-h-[93px] p-4 shadow-none border border-gray-200 rounded-2xl"
                >
                    <div className='flex flex-col md:flex-row w-full gap-4'>
                        <div className="flex flex-wrap md:flex-col items-center  gap-2">
                            <p className="font-poppins text-sm sm:text-[12px] lg:text-[16px] text-[#0454A0]">
                                Nivel
                            </p>
                            <p className="font-poppins text-xl sm:text-[28px] text-[#0454A0]">
                                {item?.nivel}
                            </p>
                        </div>

                        <Separator
                            orientation="vertical"
                            className="hidden md:block h-12 w-[2px] bg-gray-300"
                        />

                        <div className="w-full flex flex-col gap-3 sm:gap-4">
                            <div className="flex sm:flex-wrap md:flex justify-between gap-2">
                                <p className="font-poppins text-sm sm:text-base text-[#0D1421]">
                                    {item?.name}
                                </p>
                                <p className="font-poppins text-sm sm:text-base text-[#0D1421]">
                                    {item?.familia}
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-between gap-2">
                                <p className="font-poppins font-normal text-[12px] md:text-sm leading-[100%] tracking-[0%] capitalize text-[#616E85]">
                                    {item?.total_modulos} Módulos - <span
                                    className={`text-[12px] md:text-sm ${styles?.area || ""}`}>{item?.duracao_horas} Horas</span>
                                </p>
                                {item?.escolaridade_min && (
                                    <p className="font-poppins font-normal text-[12px] md:text-sm leading-[100%] tracking-[0%] capitalize text-[#616E85]">
                                        Escolaridade mínima - <span
                                        className={`text-[12px] md:text-sm ${styles?.area || ""}`}>{item?.escolaridade_min}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {isButton && (
                           <Link
                               href={`/catalogo-nacional-qualificacoes/${item?.slug}`}
                               className=" h-[28px] w-full md:w-9 md:h-16 bg-[#0454A01A] top-[16px] left-[1230.79px] rounded-[8px] flex justify-center items-center"
                           >
                               <Plus size={16} className="text-[#0454A0]"/>
                           </Link>
                    )}
                </Card>
            ))}
        </div>);
}

//url === 'formacao-profissional-acreditada'