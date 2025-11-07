import {IOfertaFormativa} from "@/services/ofertas/types";

export function FormativeProgram({dataFindId}: { dataFindId: IOfertaFormativa[] }) {
    return (
        <div className="mb-[74px]">
            {
                dataFindId?.map((item) => item?.programa_formativo?.length > 0 && (
                    <div key={item?.documentId} className="container mt-24">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-[20px] md:text-[36px] text-[#334155] font-[500] leading-[30px] font-poppins">
                                Programa Formativo
                            </h2>
                        </div>

                        <div className="mt-10 w-full border-collapse py-4">
                            <table className="w-full border-collapse">
                                <thead className="w-full">
                                <tr className="border-b text-[#334155]">
                                    <th className="text-left py-2 font-normal">Denominação</th>
                                    <th className="text-right py-2 font-normal">Duração</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dataFindId?.map(item => (
                                    item?.programa_formativo?.map((pf) => (
                                        <tr key={pf?.id} className="text-sm md:text-[16px]">
                                            <td className={`p-2 rounded-[8px] ${pf?.id % 2 === 0 ? 'bg-[#F8FAFC]' : ''}`}>
                                                {pf?.title}
                                            </td>
                                            <td className={`p-2 rounded-[8px] text-right ${pf?.id % 2 === 0 ? 'bg-[#F8FAFC]' : ''}`}>
                                                {pf?.description}
                                            </td>
                                        </tr>
                                    ))
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
