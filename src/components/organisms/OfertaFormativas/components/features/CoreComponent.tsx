'use client';
import {Card, CardContent, CardTitle} from "@/components/atoms/card";
import {Badge} from "@/components/atoms/badge";
import Link from "next/link";
import {CheckCircle, CalendarDays, MapPinHouse, Signal, FileBadge, Hash} from "lucide-react";
import {useSearchParams} from "next/navigation";

const tipoOfertaStyles: Record<string, string> = {
    "ESPONTÁNEA": "border-0 bg-[#EDF4FF] text-[#2F80ED] hover:bg-[#EDF4FF]",
    "ANUAL": "border-0 bg-[#EDFFF2] text-[#219653] hover:bg-[#EDFFF2]",
    "PONTUAL": "border-0 bg-[#FFF1E4] text-[#F2994A] hover:bg-[#FFF1E4]",
};

function getTipoOfertaStyle(tipoOferta?: string) {
    const normalizedTipo = tipoOferta
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();

    const styleKey = Object.keys(tipoOfertaStyles).find(key =>
        normalizedTipo?.includes(
            key.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        )
    );

    return styleKey
        ? tipoOfertaStyles[styleKey]
        : "border-0 bg-[#EFF2F5] text-[#616E85] hover:bg-[#EFF2F5]";
}

function getTipoOfertaLabel(tipoOferta: string) {
    const words = tipoOferta.trim().split(/\s+/);

    return words.length === 3 ? words[2] : tipoOferta;
}

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
        modalidade?: string;
        referencia_formacao: string;
        numero_edital?: string;
        tipo_oferta?: string;
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

    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "ativas";

    return (
        <Card
            onClick={() => {
                if (onSelect) onSelect(item.referencia_formacao);
            }}
            key={item?.referencia_formacao}
            className={`relative flex p-3 rounded-2xl border-[0.5px] border-[#BFC4CD] w-full shadow-none items-center
                ${isSelect ? 'cursor-pointer' : ''} ${isSelected ? 'border-2 border-green-500' : ''}`}
        >
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
                        <div className="flex items-start justify-between gap-2">
                            <CardTitle
                                title={item.formacao || item?.title}
                                className="min-w-0 flex-1 font-poppins font-medium text-[14px] md:text-[16px] text-[#334155] leading-4 md:leading-[24px] tracking-normal line-clamp-2"
                            >
                                {item.formacao || item?.title}
                            </CardTitle>

                            {tab === "ativas" && (
                                <div className="flex shrink-0 items-center gap-2">
                                    {item?.tipo_oferta && (
                                        <Badge className={`max-w-[190px] shadow-none ${getTipoOfertaStyle(item.tipo_oferta)}`}>
                                            <span className="truncate" title={item.tipo_oferta}>
                                                {getTipoOfertaLabel(item.tipo_oferta)}
                                            </span>
                                        </Badge>
                                    )}
                                    {isSelect && (
                                        isSelected ? (
                                            <CheckCircle className="shrink-0 text-green-500" size={24}/>
                                        ) : (
                                            <CheckCircle className="shrink-0 text-gray-300" size={24}/>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
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

                    {(isSelect || showAllInfo) && (
                        <div className="flex flex-wrap gap-3 text-[12px] text-[#616E85] mt-2">

                            {tab === "formacao_prevista" ? (
                                <>
                                    {item?.nivel && (
                                        <p className="flex gap-1">
                                            <Signal size={17} />
                                            <span>Nível: {item.nivel}</span>
                                        </p>
                                    )}

                                    {item?.modalidade && (
                                        <p className="flex gap-1">
                                            <FileBadge size={17} />
                                            <span>Modalidade: {item.modalidade}</span>
                                        </p>
                                    )}
                                </>
                            ) : (
                                <>
                                    {item?.duracao && (
                                        <p className="flex gap-1">
                                            <CalendarDays size={17} />
                                            <span>
                                            {item.duracao
                                                ? `${item.duracao} ${item.duracao.length === 1 ? "Mês" : "Meses"}`
                                                : "Duração indefinida"}
                                            </span>
                                        </p>
                                    )}

                                    {item?.concelho && (
                                        <p className="flex gap-1">
                                            <MapPinHouse size={17} />
                                            <span>{`${item.concelho} | ${item.ilha}`}</span>
                                        </p>
                                    )}

                                    {tab === "ativas" && (item?.numero_edital || item?.referencia_formacao) && (
                                        <p className="flex gap-1">
                                            <Hash size={17} />
                                            <span>N.º Edital: {item.numero_edital || item.referencia_formacao}</span>
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col justify-end items-end">
                        <Link
                            href={`/ofertas-formativas/${item.slug}?tab=${tab}`}
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
