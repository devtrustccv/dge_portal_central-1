"use client"
import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "../../atoms/input";
import Icon from "../../atoms/Icons";
import { Separator } from "../../atoms/separator";
import { RightShape } from "./RightShape";
import Image from "next/image";
import { MobileShape } from "./MobileShape";
import { useState, useEffect } from "react";
import CameraModal from "@/components/organisms/VerifyAuthenticity/components";
import {IContraProva} from "@/services/verifyAuthenticity";

export function VerifyAuthenticity({
   value,
   onSearch,
   resultado, loading
}:{
    value?: string;
    onSearch: (value: string) => void;
    loading: boolean;
    resultado: IContraProva | null
}) {
    const [searchTerm, setSearchTerm] = useState(value || '');
    const [codigo, setCodigo] = useState<string>();
    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(true);

    const handleInputChange = (val: string) => {
        setSearchTerm(val);
        onSearch(val);
    };

    useEffect(() => {
        if (value !== undefined && value !== searchTerm) {
            setSearchTerm(value);
        }
    }, [value]);

    return (
        <section className="relative pt-16 lg:pt-6 md:container overflow-hidden mx-auto mt-10 bg-[#F8FAFC] lg:rounded-[40px] flex flex-col lg:flex-row items-center justify-between">
            {open && <CameraModal open={open} setOpen={setOpen} setCodigo={() => setCodigo}/>}
            <div className="max-w-[885px] px-4 md:px-0 text-left lg:pl-8 lg:pb-8">
                <h2 className="text-2xl xl:text-[2.75rem] mb-4 xl:leading-[6.25rem] font-medium text-main-black">Verificar Autenticidade</h2>
                <p>Transparência e segurança ao teu alcance. Usa a nossa ferramenta para validar a autenticidade dos teus certificados e comprovativos.</p>

                <div className="max-w-[620px]">
                    <div className="flex items-center mt-4 bg-white rounded-full shadow-sm p-2 border">
                        <Search className="text-[#0454A0] ml-2" />
                        <Input
                            value={searchTerm}
                            onChange={(e) => handleInputChange(e.target.value)}
                            type="text"
                            placeholder="Insira o número do cartão prova"
                            className="text-base text-medium border-none outline-none max-w- px-3 py-2 shadow-none"
                        />
                    </div>
                    {loading && (
                        <p className="mt-2 text-blue-600 font-medium">Carregando...</p>
                    )}

                    {resultado && !loading && (
                        resultado.status ? (
                            <div className="flex items-center mt-1 bg-white rounded shadow-sm p-2 border underline">
                                <a href={resultado.link} target="_blank" rel="noopener noreferrer">{resultado.descricao}</a>
                            </div>
                        ) : (
                            <p className="flex items-center mt-1 bg-white rounded shadow-sm p-2 border underline">{resultado.msg}</p>
                        )
                    )}

                    <div className="flex items-center mt-4 gap-6 relative justify-center">
                        <Separator className="max-w-[94px]" /> <span className="text-[#BFC4CD]">ou</span> <Separator className="max-w-[94px]" />
                    </div>

                    <button onClick={handleClick} className="w-full mt-4 px-6 py-3 flex h-[56px] justify-center items-center gap-4 text-white rounded-[56px] bg-[linear-gradient(0deg,rgba(97,195,168,0.69)_0%,#1E73C3_100%)]">
                        Escaneie o QR-Code no Documento
                        <Icon name="qr-code" />
                    </button>

                    {codigo && <p className="mt-4 text-green-700">✅ QR lido: <span className="font-mono">{codigo}</span></p>}
                </div>
            </div>

            <div className="relative pt-8 lg:p-0 w-full flex items-center justify-center lg:justify-end">
                <RightShape className="absolute -bottom-8 -right-48 xl:-right-[100px] hidden lg:block" />
                <MobileShape className="absolute left-0 -bottom-[80px] lg:hidden w-full" />
                <div className="relative aspect-square w-[380px] lg:mr-12">
                    <Image src={"/assets/verify/verify.png"} alt="verify-authenticity" fill className="object-contain relative" />
                </div>
            </div>
        </section>
    );
}
