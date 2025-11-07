import {RequiredDocuments} from "@/components/molecules/RequiredDocuments";
import {ISessionDocRelevant} from "@/services/getDataProcessoRVCC/types/type";
import {IAllDocumenNode} from "@/services/getDocumentoList/getAllDocumentos/types";

export function SessionDocRelevantes({
     data,
     docs
} : {
    data: ISessionDocRelevant | undefined,
    docs: IAllDocumenNode[],
}) {

    return (
        <div>
            <div className="container">
                <RequiredDocuments
                    title={data?.label}
                    description={data?.description}
                    dataFindId={docs ?? []}
                />
            </div>
        </div>
    )
}