import { IOfertaFormativa } from "@/services/ofertas/types";
import {CircleAlert} from "lucide-react";
import InfoCard from "@/components/organisms/OfertaFormativas/DetalheOferta/features/CardInfo";

export function TrainingProgram({
    dataFindId
}: {
    dataFindId: IOfertaFormativa[] | undefined
}) {

    return (
        <div className="container grid grid-cols-1 gap-10">
            {dataFindId?.map(item => {

                const infoItems = [
                    { title: "Período de Formação", value: item?.periodo_formacao != null ? `${item.periodo_formacao}` : null },//Mês(es)
                    { title: "Duração da Formação", value: `${item?.duracao ?? null } Mês(es)`},
                    { title: "Carga Horária", value: item?.carga_horaria != null ? `${item.carga_horaria} Horas` : null },
                    { title: "Modalidade", value: item?.modalidade ?? null },
                    { title: "Número de Vagas", value: item?.numero_vagas ?? null },
                    { title: "Taxa de Matricula", value: item?.valor_matricula ?? null },
                    { title: "Valor de Propina", value: item?.valor_propina != null ? `${item.valor_propina}$00 - Mensal` : null },
                    { title: "Data Início da Formação", value: item?.data_inicio_formacao ?? null },
                    { title: "Data Fim da Formação", value: item?.data_fim_formacao ?? null },
                    { title: "Período de Candidatura", value: item?.data_inicio && item?.data_fim ? `De ${item.data_inicio} a ${item.data_fim}` : null },
                    { title: "Avaliação da Candidatura", value: item?.data_avalicao ?? null },
                    { title: "Comunicação dos Resultados", value: item?.data_resultado ?? null },
                ].filter(info => info.value != null && info.value !== "");

                return (
                    <div key={item?.documentId} className="py-10">
                        {item?.texto_informativo && (
                            <div
                                className="flex items-center w-full rounded-[32px] h-auto px-2 py-1 gap-4 border bg-[#61C3A81A] text-[#61C3A8]">
                                <CircleAlert size={30}/>
                                <p title={item?.texto_informativo} className="text-xs line-clamp-3">
                                    {item?.texto_informativo}
                                </p>
                            </div>
                        )}

                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 gap-4">
                            {infoItems.map((info, index) => (
                                <InfoCard
                                    key={index}
                                    title={info.title}
                                    value={info.value || ''}
                                />
                            ))}
                        </div>
                    </div>
                )
            })
            }
        </div>
    );
}