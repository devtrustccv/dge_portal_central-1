import React from "react";
import {RequiredDocuments} from "@/components/molecules/RequiredDocuments";
import {IAllDocumenNode} from "@/services/getDocumentoList/getAllDocumentos/types";
import { IDocs } from "@/services/page-extra-info/type";


interface SectionDocumentosRelevantesProps {
    data?: IDocs 
    documentos : IAllDocumenNode[];
}


const SectionDocumentosRelevantes: React.FC<SectionDocumentosRelevantesProps> = ({data, documentos}) => {
    return (
        <section className="container ">


            <RequiredDocuments title={data?.label} description={data?.description} dataFindId={documentos}/>


        </section>

    );
}
export default SectionDocumentosRelevantes