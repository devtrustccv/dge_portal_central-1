import {Banner} from "@/components/atoms/banner";
import {SessionDocRelevantes} from "@/components/organisms/ProcessoRVCC/session_doc_relevantes";
import {SaibaMais} from "@/components/atoms/saiba-mais";
import SectionRequisitos from "@/components/molecules/ProcessoAcreditacao/sectionRequisitos";
import SectionServicos from "@/components/molecules/ProcessoAcreditacao/sectionServicos";
import React from "react";
import SectionEntidade from "@/components/molecules/ProcessoAcreditacao/SectionEntidades";
import SectionEntidadeAcreditada from "@/components/molecules/ProcessoAcreditacao/sectionEntidadeAcreditada";
import {Props} from "@/components/template/ProcessoRVCCTemplate/processoRVCCTemplate";

export default function ProcessoRvcc({data, docs, services, entidades} : Props) {

    const imagem = data?.homeBanner?.banner?.headerImage?.formats?.medium?.url || '/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png'
    return (
        <div>
            <Banner
                title={data?.homeBanner?.banner?.title} subTitle={data?.homeBanner?.banner?.subtitle}
                image={imagem}
            />
            {data?.homeBanner?.description && (
                <div className="container">
                    <div className="py-14 text-editor"
                         dangerouslySetInnerHTML={
                             {__html: data?.homeBanner?.description || ''}
                         }
                    />
                </div>
            )}
            <div className="flex flex-col gap-16 md:gap-24 mt-4 md:mt-8 mb-4">
                {data?.tabs_certificacao_comp_profissionais?.title && (
                    <div>
                        <SectionRequisitos
                            geral={{
                                ...data.tabs_certificacao_comp_profissionais,
                                tabs: data.tabs_certificacao_comp_profissionais.tabs.map(tab => ({
                                    ...tab,
                                    list_contents: tab.list_contents?.map(item => ({
                                        questions: item.title || "",
                                        response: item.description || ""
                                    })) || []
                                }))
                            }}
                        />
                    </div>
                )}

                {data?.session_entities_cert?.title && (
                    <div>
                        <SectionEntidade
                            entidades={entidades || []}
                            session_entities_acredit={data?.session_entities_cert ?? ''}
                        />
                    </div>
                )}

                {data?.certificacao_config?.title && (
                    <div>
                        <SectionRequisitos
                            geral={{
                                ...data.certificacao_config,
                                tabs: data.certificacao_config.tabs.map(tab => ({
                                    ...tab,
                                    list_contents: tab.list_contents?.map(item => ({
                                        questions: item.title || "",
                                        response: item.description || ""
                                    })) || []
                                }))
                            }}
                        />
                    </div>
                )}

                <div>
                    <SessionDocRelevantes
                        docs={docs ?? []}
                        data={data?.session_doc_relevant}
                    />
                </div>

                {data?.session_services?.title && (
                    <div>
                        <SectionServicos
                            session_service={{
                                ...data.session_services,
                                button: {
                                    ...data.session_services.button,
                                    external_link: data.session_services.button.external_link,
                                }
                            }}
                            services={services || []}
                        />
                    </div>
                )}

                {data?.session_entity?.title && (
                    <div>
                        <SectionEntidadeAcreditada data={data?.session_entity}/>
                    </div>
                )}

                {data?.homeBanner?.banner?.saiba_mais && (
                    <div className="container">
                        <SaibaMais
                            title={'Saiba Mais'}
                            data={data?.homeBanner?.banner?.saiba_mais}
                        />
                    </div>
                )}
            </div>

        </div>
    )
}