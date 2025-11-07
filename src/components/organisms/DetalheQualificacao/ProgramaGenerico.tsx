import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/atoms/table";
import { INode } from "@/services/catalogo/getDetalheQualificacao/Types/type";
import {ArrowDownToLine} from "lucide-react";
//import {gerarPDF} from "@/components/template/DetalhesQualificacao/action/gerarPDF";

interface IProps {
    data: INode[] | undefined;
    formacaoTitle: {
        denominacao: string;
        duracao: string
    } | {
        denominacao: string;
        codigo: string };
    tipo: "formacao" | "certificacao";
}

export function ProgramaGenerico({
     data,
     formacaoTitle,
     tipo
}:
 IProps) {
    const isFormacao = tipo === "formacao";

    // Aqui estamos verificando se 'duracao' está presente no objeto
    const duracaoOuCodigo = isFormacao ? (formacaoTitle as { denominacao: string; duracao: string }).duracao : (formacaoTitle as { denominacao: string; codigo: string }).codigo;

    return (
        <div>
            <div className="container">
                <div className="flex justify-between items-center mt-16 mb-8">
                    <h1 className="font-poppins font-medium text-[28px] md:text-[32px] leading-[30px] tracking-[0%] text-[#334155]">
                        {isFormacao ? "Programa Formativa" : "Unidades de Competências"}
                    </h1>

                    <button
                        //onClick={() => gerarPDF(formacaoTitle, data, tipo)}
                        className="w-[83px] h-[30px] gap-[5px] bg-[#0454A0] rounded-[8px] text-white flex justify-center items-center">
                        PDF  <ArrowDownToLine size={18}/>
                    </button>
                </div>
            </div>

            <Table className="w-full overflow-hidden">
                <TableHeader>
                    <TableRow>
                        <TableHead className="uppercase text-[#334155]">
                            {formacaoTitle?.denominacao}
                        </TableHead>
                        <TableHead className="uppercase text-right text-[#334155]">
                            {duracaoOuCodigo}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map(item =>
                        (isFormacao ? item?.formacao : item?.certificado)?.map(value => (
                            <TableRow key={value?.id} className="border-none w-full text-[#616E85]">
                                <TableCell className="rounded-l-xl">
                                    {value?.denominacao}
                                </TableCell>
                                <TableCell className="rounded-r-xl text-right">
                                    {value?.label}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
