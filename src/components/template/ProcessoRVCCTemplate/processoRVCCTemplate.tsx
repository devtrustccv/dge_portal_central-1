import ProcessoRvcc from "@/components/organisms/ProcessoRVCC/processo_rvcc";
import {IProcessoRvccProps} from "@/services/getDataProcessoRVCC/types/type";
import {IAllDocumenNode} from "@/services/getDocumentoList/getAllDocumentos/types";
import {IServiceNode} from "@/services/services/type";
export interface Props{
    data: IProcessoRvccProps | undefined | null,
    docs: IAllDocumenNode[] | undefined,
    services: IServiceNode[] | undefined
    entidades: {
        name: string;
        ilha?: string;
        documentId: string;
        slug?: string;
        concelho: string;
        zona: string;
        formacoes?: {
            name: string
        }[]
    }[]
}
export function ProcessoRVCCTemplate({data, docs, services, entidades}: Props) {
    return <ProcessoRvcc
                docs={docs}
                services={services}
                entidades={entidades}
                data={data}
            />

}