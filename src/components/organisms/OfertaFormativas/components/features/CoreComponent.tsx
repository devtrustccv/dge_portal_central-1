'use client';
import {Card, CardContent, CardTitle} from "@/components/atoms/card";
import Link from "next/link";
import {CheckCircle, CalendarDays, MapPinHouse} from "lucide-react";
interface CardFormacaoItemProps {
    item: {
        documentId: string;
        slug: string;
        formacao?: string;
        denominacao_entidade?: string;
        url_logo_entidade?: string;
        image?: string;
        title?: string;
        description?: string;
        duracao?: string;
        periodo_formacao?: string;
        ilha?: string;
        concelho?: string;
        nivel?: string;
        referencia_formacao: string;
    };
    isSelect?: boolean;
    onSelect?: (documentId: string) => void;
    showAlert?: boolean;
    setShowAlert?: (value: boolean) => void;
    selectedItems?: string[];
    useSlectProps?:  boolean
    showAllInfo?:  boolean
    target?:  "_blank" | "_self";
}

export function CardFormacaoItem({
     item,
     isSelect,
     onSelect,
     selectedItems,
     useSlectProps = false,
     showAllInfo = false,
     target = "_self",
}: CardFormacaoItemProps) {
    const isSelected = useSlectProps ? isSelect: selectedItems?.includes(item?.referencia_formacao);

    return (
        <Card
            onClick={() => {
                if (onSelect) onSelect(item.referencia_formacao);
            }}
            key={item?.referencia_formacao}
            className={`relative flex p-3 rounded-2xl border-[0.5px] border-[#BFC4CD] w-full shadow-none items-center
                ${isSelect ? 'cursor-pointer' : ''} ${isSelected ? 'border-2 border-green-500' : ''}`}
        >
            {
                isSelect && (
                    <div className="bg-red-400">
                        {isSelected ? (
                            <CheckCircle className="absolute top-2 right-2 text-green-500" size={24}/>
                        ) : (
                            <CheckCircle className="absolute top-2 right-2 text-gray-300" size={24}/>
                        )}
                    </div>
                )
            }

            <div className="flex gap-4 w-full h-auto overflow-hidden md:mb-0">
                <img
                    src={item?.url_logo_entidade || "/logotipos.svg"}
                    alt=""
                    width={141}
                    height={150}
                    className="h-[140px] rounded-lg p-1 bg-[#0454A012] object-contain mix-blend-multiply"
                    onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== window.location.origin + "/logotipos.svg") {
                            target.src = "/logotipos.svg";
                        }
                    }}
                />

                <CardContent className="w-full grid h-auto">
                    <div>
                        <CardTitle
                            title={item.formacao || item?.title}
                            className="font-poppins w-[90%] font-medium text-[14px] md:text-[16px] text-[#334155] leading-4 md:leading-[24px] tracking-normal line-clamp-2"
                        >
                            {item.formacao || item?.title}
                        </CardTitle>
                        <div
                            title={item.description}
                            className={`font-poppins text-[#616E85] font-normal text-[12px] md:text-[14px] leading-4 md:leading-[20px] overflow-hidden ${
                                isSelect ? "line-clamp-2 max-h-[40px]" : "line-clamp-3 max-h-[60px]"
                            }`}
                            dangerouslySetInnerHTML={{
                                __html: item.denominacao_entidade || item?.description || "",
                            }}
                        />
                    </div>

                    {(isSelect || showAllInfo ) && (
                        <div className="flex flex-wrap gap-3 text-[12px] text-[#616E85] mt-2">
                            {item?.duracao !== "0" && (
                                <p className="flex gap-1">
                                    <CalendarDays size={17}/>
                                    <span>
                                        {item.duracao
                                            ? `${item.duracao} ${item.duracao.length === 1 ? "Mês" : "Meses"}`
                                            : "Duração indefinida"}
                                    </span>
                                </p>
                            )}
                            {item?.concelho && (
                                <p className="flex gap-1">
                                    <MapPinHouse size={17}/>
                                    <span>{`${item.concelho} | ${item.ilha}`}</span>
                                </p>
                            )}
                           {/* {item?.ilha && (
                                <p className="flex gap-1">
                                    <span>{item.ilha}</span>
                                </p>
                            )}*/}
                        </div>
                    )}

                    <div className="flex flex-col justify-end items-end">
                        <Link
                            href={`/ofertas-formativas/${item.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            target={target}
                            className="w-[100px] h-[25px] mt-1 md:w-[109px] md:h-[28px] bg-[#0454A0] text-white text-[12px] rounded-lg flex justify-center items-center"
                        >
                            SAIBA MAIS
                        </Link>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

