import { SaibaMais } from "@/components/atoms/saiba-mais";
import { IPageListaProgramaEmpresarialData } from "@/services/page-list-programa-empresarial/type";

import { Banner } from "@/components/atoms/banner";

import SectionEstatistica from "@/components/molecules/ProcessoAcreditacao/sectionEstatistica";
import SectionServicos from "@/components/molecules/ProcessoAcreditacao/sectionServicos";
import { IServiceNode } from "@/services/services/type";
import { IAllDocumenNode } from "@/services/getDocumentoList/getAllDocumentos/types";
import SectionDocumentosRelevantes from "@/components/molecules/ProcessoAcreditacao/sectionDocumentos";
import SectionEntidadeAcreditada from "@/components/molecules/ProcessoAcreditacao/sectionEntidadeAcreditada";
import { Card, CardContent, CardTitle } from "@/components/atoms/card";
import Image from "next/image";
import Link from "next/link";
import { IListaProgramasData } from "@/services/page-list-programa-empresarial/getListaProgramas/mapper";
import { NoItemsFound } from "@/components/organisms/NotItemnsFound";
import { isInternalUrl } from "@/lib/utils";

export interface IPageProgramaEmpresarialData
  extends IPageListaProgramaEmpresarialData {
  serviceData: IServiceNode[] | undefined;
  documentoData: IAllDocumenNode[] | undefined;
  programasData: IListaProgramasData[] | null;
}

export function ListaProgramaEmpresarialTemplates({
  title,
  subtitle,
  description,
  saiba_mais,
  headerImage,
  session_service,
  session_statistic,
  session_doc_relev,
  session_entity,

  programasData,
  serviceData,
  documentoData,
}: IPageProgramaEmpresarialData) {
    const imagem = headerImage?.formats?.medium?.url || '/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png'

  return (
      <div>
          <Banner
              title={title}
              subTitle={subtitle}
              image={imagem}
          />


          <div className="container mt-16">
              <h1
                  className="mb-16 text-editor text-[#616E85]"
                  dangerouslySetInnerHTML={{__html: description || ""}}
              />
          </div>

          <div className="container w-auto h-auto ">
              <div className="flex gap-5 overflow-hidden  h-auto">
                  {programasData && programasData.length > 0 ? (
                      <div className="w-full grid gap-y-6 py-4 h-full overflow-hidden">
                          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                              {programasData?.map((item, i) => {
                                  return (
                                      <div key={`program-${i}`}>
                                          <Card
                                              className={`flex w-full shadow-none p-3 items-center gap-4 rounded-2xl border-[#BFC4CD] border-[0.5px] cursor-pointer relative`}
                                          >
                                              <Image
                                                  src={item.image.url}
                                                  alt={item.image.name}
                                                  width={141}
                                                  height={150}
                                                  className="h-[140px] rounded-lg p-1 bg-[#0454A012] object-contain"
                                                  sizes="141px"
                                              />
                                              <CardContent className="w-full h-[140px] grid grid-cols-1">
                                                  <CardTitle
                                                      title={item?.title}
                                                      className="font-poppins font-medium text-[16px] leading-[24px] tracking-normal line-clamp-3"
                                                  >
                                                      {item.title}
                                                  </CardTitle>

                                                  <div
                                                      title={item.description}
                                                      className={`font-poppins text-[#616E85] font-normal text-[14px] leading-[20px] line-clamp-2 h-auto`}
                                                      dangerouslySetInnerHTML={{
                                                          __html: item.description || item?.description || ''
                                                      }}
                                                  />
                                                  <div className="flex flex-col justify-end items-end">
                                                      <Link
                                                          href={`${item.url}`}
                                                          target={isInternalUrl(item.url) ? '_self' : '_blank'}
                                                          className="w-[109px] h-[28px] px-4 py-2 bg-[#0454A0] text-white text-[12px] rounded-lg flex justify-center items-center">
                                                          SAIBA MAIS
                                                      </Link>
                                                  </div>
                                              </CardContent>
                                          </Card>
                                      </div>
                                  );
                              })}
                          </div>
                      </div>
                  ) : (
                      <NoItemsFound title="Nenhum Programa Encontrado" description=""/>
                  )}
              </div>
          </div>
          <div className="flex flex-col gap-16 md:gap-24 mt-10 md:mt-16">
              {session_statistic?.title && (
                  <div>
                      <SectionEstatistica statistics={session_statistic}/>
                  </div>
              )}

              {documentoData && documentoData?.length > 0 && (
                  <div>
                      <SectionDocumentosRelevantes
                          data={session_doc_relev}
                          documentos={documentoData || []}
                      />
                  </div>
              )}

              {serviceData && serviceData?.length > 0 && (
                  <div>
                      <SectionServicos
                          session_service={session_service}
                          services={serviceData || []}
                      />
                  </div>
              )}

              {session_entity.title && (
                  <div>
                      <SectionEntidadeAcreditada data={session_entity}/>
                  </div>
              )}

              {saiba_mais && saiba_mais.length > 0 && (
                  <div className="w-full">
                      <SaibaMais title={"Saiba Mais"} data={saiba_mais}/>
                  </div>
              )}
          </div>


      </div>
  );
}
