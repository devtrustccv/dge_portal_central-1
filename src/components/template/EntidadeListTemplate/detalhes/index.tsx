"use client"
import {Banner} from "@/components/atoms/banner";
import SectionAlvaras from "@/components/organisms/EntidadesFormadoras/detalhes/sectionAlvaras";
import SectionFormacoes from "@/components/organisms/EntidadesFormadoras/detalhes/sectionFormacoes";
import {useSearchParams} from "next/navigation";
import {IEntidade} from "@/services/entidades/entidades/types";
import {IDetalhesEntidades} from "@/services/entidades/pageDetalhesEntidades/types";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/atoms/select";
import {useState} from "react";
import {Pagination} from "@/components/molecules/PaginationBeta";
import * as React from "react";
import {SaibaMais} from "@/components/atoms/saiba-mais";


export default function DetalhesEntidadesTemplate({
  pageInfo,
  data = [],
}: {
    data: IEntidade[] | undefined;
    pageInfo: IDetalhesEntidades | undefined;
}) {
    const searchParams = useSearchParams();
    const [selectedAlvara, setSelectedAlvara] = useState<string | undefined>("Todos");

    if (!Array.isArray(data)) {
        console.error("Erro: 'data' não é um array", data);
        return null;
    }

    const per_page = 6;
    const currentPage = Number(searchParams.get("page")) || 1;

    return (
        <section className="mb-16">
            {data.map((dataFindId, index) => {

                const zona_concelho = `${dataFindId?.zona}, ${dataFindId?.concelho}`;
                const pagedata = pageInfo?.listaDetalhesFormadoras;
                const uniqueAlvaras = Array.from(new Set(dataFindId?.formacoes?.map(item => item.num_alvara)));
                const allAlvaras = ["Todos", ...uniqueAlvaras];

                const total = dataFindId?.formacoes?.length ?? 0;
                const paginateData = dataFindId?.formacoes?.slice(
                    (currentPage - 1) * per_page,
                    currentPage * per_page
                );

                const filteredFormacoes = selectedAlvara && selectedAlvara !== "Todos"
                    ? paginateData?.filter(item => item.num_alvara === selectedAlvara) || []
                    : paginateData || [];

                return (
                    <div key={index}>
                        <Banner
                            title={pagedata?.PageInfo?.title ?? ' '}
                            subTitle={dataFindId?.name}
                            subTitle2={zona_concelho}
                            subTitle3={dataFindId?.contactos}
                            image={pagedata?.PageInfo?.headerImage?.url}
                        />
                        <div className="container py-14 flex flex-col gap-28">
                            <SectionAlvaras dataFindId={dataFindId}/>
                            <div className="flex flex-col gap-16 mb-8">
                                <div className="flex gap-2 justify-between">
                                    <h1 className="text-[36px] font-[500] leading-10 text-[#334155] font-poppins">
                                        Formações
                                    </h1>
                                    <Select onValueChange={(value) => setSelectedAlvara(value)} value={selectedAlvara}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Selecione um Alvara"/>
                                        </SelectTrigger>
                                        <SelectContent side="bottom">
                                            <SelectGroup>
                                                <SelectLabel>Alvaras</SelectLabel>
                                                {allAlvaras.map((num_alvara, idx) => (
                                                    <SelectItem key={idx} value={num_alvara}>
                                                        {num_alvara === "Todos" ? num_alvara : `Nº ${num_alvara}`}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <SectionFormacoes dataFind={filteredFormacoes}/>
                                </div>
                                {total > per_page && (
                                    <Pagination
                                        totalCountOfRegisters={total}
                                        registerPerPage={per_page}
                                        currentPage={currentPage}
                                        searchParams={Object.fromEntries(searchParams)}
                                    />
                                )}
                            </div>
                            {pagedata?.SaibaMais && (
                                <SaibaMais title={"Saiba Mais"} data={pagedata?.SaibaMais}/>
                            )}
                        </div>
                    </div>
                );
            })}
        </section>
    );
}


