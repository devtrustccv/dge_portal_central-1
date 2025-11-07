import {Banner} from "@/components/atoms/banner";
import { SaibaMais } from "@/components/atoms/saiba-mais";
import {
    FrameworkOfQualifications
} from "@/components/organisms/ComponentesSistemaQualificacoes/frameworkOfQualifications";
import {
    NationalQualificationsCatalog
} from "@/components/organisms/ComponentesSistemaQualificacoes/nationalQualificationsCatalog";
import {OtherSnqComponents} from "@/components/organisms/ComponentesSistemaQualificacoes/otherSnqComponents";
import {IGetCSNQ} from "@/services/getDataSNQ/types/type";
import React from "react";
import SectionDocumentosRelevantes from "@/components/molecules/ProcessoAcreditacao/sectionDocumentos";
import { IAllDocumenNode } from "@/services/getDocumentoList/getAllDocumentos/types";

export function ComponentesSistemaQualificacoesTemplate({
    data,
    documentoData
}: {
    data: IGetCSNQ | null | undefined,
    documentoData: IAllDocumenNode[] | undefined
}){
    const imagem = data?.homeBanner?.banner?.headerImage?.formats?.medium?.url;

    return (
        <div>
            <Banner
                title={data?.homeBanner?.banner?.title}
                subTitle={data?.homeBanner?.banner?.subtitle}
                image={imagem}
            />

            {data?.homeBanner?.description && (
                <div className="container">
                    <div className="py-14 text-editor text-[#616E85]"
                         dangerouslySetInnerHTML={
                             {__html: data?.homeBanner?.description || ''}
                         }
                    />
                </div>
            )}

            <div className="container">
                <FrameworkOfQualifications data={data}/>
                <NationalQualificationsCatalog data={data}/>
                <OtherSnqComponents data={data}/>
                {documentoData && <SectionDocumentosRelevantes
                    data={data?.section_doc_relevante}
                    documentos={documentoData ?? []}
                />}
                <div className='mt-20'>
                    {
                        data?.homeBanner?.banner?.saiba_mais && (
                            <SaibaMais
                                title={'Saiba Mais'}
                                data={data?.homeBanner?.banner?.saiba_mais}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}