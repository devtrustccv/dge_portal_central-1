"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/atoms/card";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const EntidadeList: React.FC<{
    entidades: {
        name: string;
        ilha?: string;
        documentId: string;
        slug?: string;
        concelho: string;
        zona: string;
        formacoes?: {
            name: string;
        }[];
    }[];
    className?: string;
}> = ({ entidades, className }) => {
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // esconde após 3s
    };

    return (
        <div className={className}>
            {/* Alerta visível */}
            {showAlert && (
                <div className="fixed top-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow z-50 transition-all duration-300">
                    Esta Entidade não possui um Alvará Válido.
                </div>
            )}

            {entidades?.map((item, index) => (
                <Card
                    key={index}
                    className="w-full min-h-[136px] rounded-[16px] gap-[20px] border-[0.5px] p-[16px] shadow-none overflow-hidden"
                >
                    <div className="h-full flex flex-col justify-between ">
                        <CardContent className="flex flex-col gap-2 ">
                            <CardDescription className="font-poppins font-medium text-[12px] md:max-text-[14px] leading-[14px] tracking-[0%] uppercase">
                                {`${item?.concelho} - ${item?.zona}`}
                            </CardDescription>
                            <CardTitle className="mb-4 font-poppins font-medium text-[14px] md:text-[16px] leading-[24px] tracking-[0%] capitalize text-[#334155]">
                                {item.name}
                            </CardTitle>
                        </CardContent>

                        {item?.formacoes?.length ? (
                            <Link href={`/entidades-formadoras/${item?.slug}`}>
                                <button className="bg-[#0454A01A] text-[#0454A0] w-[258px] flex items-center justify-center h-[30px] border-1 rounded-[8px] gap-[8px] shadow-none">
                                    <p className="font-poppins font-medium text-[12px] md:text-[14px] tracking-[0%] uppercase">
                                        {item.formacoes.length} formações acreditadas
                                    </p>
                                    <GoArrowRight />
                                </button>
                            </Link>
                        ) : (
                            <button
                                onClick={handleClick}
                                className="bg-[#0454A01A] text-[#0454A0] w-[258px] flex items-center justify-center h-[30px] border-1 rounded-[8px] gap-[8px] shadow-none cursor-pointer"
                            >
                                <p className="font-poppins font-medium text-[12px] md:text-[14px] tracking-[0%] uppercase">
                                    0 formações acreditadas
                                </p>
                                <GoArrowRight />
                            </button>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default EntidadeList;
