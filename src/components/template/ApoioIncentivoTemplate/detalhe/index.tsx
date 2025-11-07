import {Banner} from "@/components/atoms/banner";

import React from "react";
import {IPageDetalheApoioIncentivoData} from "@/services/apoioIncentivo/page-detalhe-apoio-incentivo/types";
import {IApoiIncentivo} from "@/services/apoioIncentivo/types";
import SectionRequisitos from "@/components/molecules/ProcessoAcreditacao/sectionRequisitos";
import {IAllDocumenNode} from "@/services/getDocumentoList/getAllDocumentos/types";
import SectionDocumentosRelevantes from "@/components/molecules/ProcessoAcreditacao/sectionDocumentos";
import {IServiceNode} from "@/services/services/type";
import SectionServicos from "@/components/molecules/ProcessoAcreditacao/sectionServicos";
import SectionEntidadeAcreditada from "@/components/molecules/ProcessoAcreditacao/sectionEntidadeAcreditada";
import {SaibaMais} from "@/components/atoms/saiba-mais";
import NotFound from "@/app/not-found";
interface DetalheApoioIncentivoProps{
    data : IPageDetalheApoioIncentivoData | undefined,
    dataFindId : IApoiIncentivo [];
    documentoData:  IAllDocumenNode[] | undefined
    serviceData: IServiceNode[] | undefined
}




const PageDetalheApoiIncentivoTemplate: React.FC<DetalheApoioIncentivoProps> = ({data, dataFindId,documentoData, serviceData })=>{
    if (!dataFindId.length) return <NotFound/>
    return(
        <section>
            <Banner title={data?.title} subTitle={data?.subtitle} image={data?.headerImage?.url}/>
            {dataFindId?.map((item, index)=> {
                return (
                    <div key={index} className=" mt-16 mb-24">
                        <div className="container">
                            <p className="font-poppins font-medium text-[32px] md:text-[44px] leading-[42px] md:leading-[56px] text-[#334155]  tracking-[0%] ">
                                {item?.title}
                            </p>
                            <h1 className="text-editor font-poppins font-light text-[16px] leading-[28px] tracking-[1%] mt-8"
                                dangerouslySetInnerHTML={{__html: item?.description || ""}}
                            />
                        </div>

                        <div className="flex flex-col gap-16 md:gap-24 mt-8 md:mt-16">
                            {item?.tabs?.tabs && item?.tabs?.tabs?.length > 0 && (
                                <div>
                                    <SectionRequisitos geral={item?.tabs} />
                                </div>
                            )}

                            {documentoData && documentoData?.length > 0 && (
                                <div>
                                    <SectionDocumentosRelevantes
                                        data={data?.session_doc_relev}
                                        documentos={documentoData || []}
                                    />
                                </div>
                            )}

                            {serviceData && serviceData?.length > 0 && data?.session_service?.title && (
                                <div>
                                    <SectionServicos
                                        session_service={data?.session_service}
                                        services={serviceData || []}
                                    />
                                </div>
                            )}

                            {item.session_entity.title && (
                                    <div>
                                    <SectionEntidadeAcreditada data={item?.session_entity}/>
                                    </div>
                                )}
                            {item?.saiba_mais && item.saiba_mais.length > 0 && (
                            <div className="container">
                                        <SaibaMais title={"Saiba Mais"} data={item?.saiba_mais}/>
                            </div>
                            )}

                        </div>


                    </div>
                )
                }
            )}

        </section>

    )
}
export default PageDetalheApoiIncentivoTemplate