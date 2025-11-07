import {Banner} from "@/components/atoms/banner";
import SectionRequisitos from "@/components/molecules/ProcessoAcreditacao/sectionRequisitos";
import SectionServicos from "@/components/molecules/ProcessoAcreditacao/sectionServicos";
import SectionEstatistica from "@/components/molecules/ProcessoAcreditacao/sectionEstatistica";
import SectionDocumentosRelevantes from "@/components/molecules/ProcessoAcreditacao/sectionDocumentos";
import SectionEntidadeAcreditada from "@/components/molecules/ProcessoAcreditacao/sectionEntidadeAcreditada";
import {IPageProcessoAcreditacaoData} from "@/services/page-processo-de-acreditacao/types";
import React from "react";
import {IServiceNode} from "@/services/services/type";
import SectionEntidade from "@/components/molecules/ProcessoAcreditacao/SectionEntidades";
import {SaibaMais} from "@/components/atoms/saiba-mais";
import {IAllDocumenNode} from "@/services/getDocumentoList/getAllDocumentos/types";

interface ProcessoAcreditacaoProps{
    data : IPageProcessoAcreditacaoData
    serviceData: IServiceNode[] | undefined
    documentoData:  IAllDocumenNode[] | undefined
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
    }[] | undefined
}

const ProcessoAcreditacaoTemplate: React.FC<ProcessoAcreditacaoProps> = ({data, serviceData, entidades, documentoData})=>{
    return(
        <section>
            <Banner title={data?.title} subTitle={data?.subtitle} image={data?.headerImage?.url}/>

            <div className=" flex flex-col gap-12">
                <div className="mt-12 container">
                    <h1 className="text-editor text-[#616E85]"
                        dangerouslySetInnerHTML={{__html: data?.description || ""}}
                    />
                </div>
                <div className="flex flex-col gap-16 md:gap-24">
                    <div>
                        {data?.tabs?.title && (
                            <SectionRequisitos geral={data?.tabs}/>
                        )}
                    </div>
                    <div>
                        {data?.session_entities_acredit.title && (
                            <SectionEntidade
                                session_entities_acredit={data?.session_entities_acredit}
                                entidades={entidades || []}
                            />
                        )}
                    </div>
                    <div>
                        {data?.statistics?.title && (
                            <SectionEstatistica statistics={data?.statistics}/>
                        )}
                    </div>
                    <div>
                        {data?.session_service?.title && (
                            <SectionServicos session_service={data?.session_service} services={serviceData || []}/>
                        )}
                    </div>
                    <div>
                        {documentoData?.length && (
                            <SectionDocumentosRelevantes data={data?.session_doc_relev}
                                                         documentos={documentoData || []}/>
                        )}
                    </div>
                    <div>
                        {data?.session_entity.title && (
                            <SectionEntidadeAcreditada data={data?.session_entity}/>
                        )}
                    </div>

                        <SaibaMais title={"Saiba Mais"} data={data?.saiba_mais}/>
                </div>
            </div>
        </section>
    )
}
export default ProcessoAcreditacaoTemplate;