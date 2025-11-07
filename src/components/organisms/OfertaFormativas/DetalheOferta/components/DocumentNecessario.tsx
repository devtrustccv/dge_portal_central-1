import {RequiredDocuments} from "@/components/molecules/RequiredDocuments";
import {IOfertaFormativa} from "@/services/ofertas/types";

export function DocumentNecessario({ dataFindId }: { dataFindId: IOfertaFormativa[] | undefined }){
    return (
        <>
            {dataFindId?.map(item => (
                <div key={item?.documentId}>
                    {item?.documentos_necessarios && item?.documentos_necessarios.length > 0 && (
                        <RequiredDocuments
                            title={'Documentos Necessários'}
                            dataFindId={item?.documentos_necessarios}
                        />
                    )}
                </div>
            ))}
        </>
    )
}