'use client'
import { IOfertasFormativasData } from "@/services/ofertas/types";
import { TrainingProgram } from "@/components/organisms/OfertaFormativas/DetalheOferta/components/TrainingProgram";
import { Banner } from "@/components/atoms/banner";
import { DetalhesOfertaFormativaProvider } from "@/components/organisms/OfertaFormativas/DetalheOferta/context";
import { AccessConditions } from "./components/AccessConditions";
import { FormativeProgram } from "./components/FormativeProgram";
import { CriteriaForAcceptanceAndExit } from "@/components/organisms/OfertaFormativas/DetalheOferta/components/CriteriaForAcceptanceAndExit";
import { IPageInfoModal } from "@/services/page-detalhe-oferta/type";
import { notFound, useRouter } from "next/navigation";
import { DocumentNecessario } from "@/components/organisms/OfertaFormativas/DetalheOferta/components/DocumentNecessario";
import { setCookie } from "nookies";
import { useNavigation } from "@/context/NavigationContext";

export function CourseDetails({
    data,
    pageInfoDetail
}: {
    data: IOfertasFormativasData | undefined
    pageInfoDetail: IPageInfoModal | undefined
}) {
    const { hasSession } = useNavigation();
    const router = useRouter()
    const image = pageInfoDetail?.pageInfo?.headerImage?.formats?.medium?.url || '/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png';
    if (!data?.nodes.length) notFound();
    const handleLogin = () => {
        const redirectPath = `${process.env.NEXT_PUBLIC_SITE_URL}/ofertas-formativas/candidatura?cursos=${data?.nodes[0]?.referencia_formacao}`;
        setCookie(null, "redirect_path", redirectPath, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });
        const callbackUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
        const loginUrl = `${process.env.NEXT_PUBLIC_CENTRAL_BASE_URL}/api/auth/external/login?redirectUrl=${encodeURIComponent(callbackUrl)}`;
        window.location.href = loginUrl;
    };

    return (
        <div className="mb-[333px]">
            <DetalhesOfertaFormativaProvider data={data?.nodes || []}>
                {data?.nodes?.map(item => (
                    <Banner
                        key={item?.documentId}
                        title={pageInfoDetail?.pageInfo?.title}
                        subTitle={`${item?.formacao} - ${'Nível '+ item?.nivel}`}
                        subTitle2={`${item?.familia} - ${item?.denominacao_entidade}`}
                        subTitle3={[
                            { title: "Conselho", value:`${item.concelho}`},
                            { title: "Ilha:", value:`${item.ilha}`}
                        ]}
                        image={image}
                    >
                        <button
                            onClick={() => {
                                if (hasSession) {
                                    router.push(`/ofertas-formativas/candidatura?cursos=${data?.nodes[0]?.referencia_formacao}`);
                                } else {
                                    handleLogin();
                                }
                            }}
                            className="flex justify-center items-center w-[250px] md:w-[300px] mt-4 h-[20px] md:h-[40px] top-[184px] left-[1562px] rounded-[50px] border uppercase
                           border-white p-[20px_28px] md:p-[24px_32px] gap-[32px] bg-white/25 font-poppins font-semibold text-[14px] md:text-[16px] leading-[30px] tracking-[0%]"
                        >
                            realizar candidatura
                        </button>
                    </Banner>
                ))}
                   <TrainingProgram dataFindId={data?.nodes} />
                   <AccessConditions dataFindId={data?.nodes} />
                   <CriteriaForAcceptanceAndExit
                       title={'Critérios de Seleção'}
                       description={''}
                       dataFindId={data?.nodes[0].criterio_selecao}
                   />
                   <DocumentNecessario dataFindId={data?.nodes} />
                   <FormativeProgram dataFindId={data?.nodes} />
                   <CriteriaForAcceptanceAndExit
                       title={'Saída Profissional'}
                       description={data?.nodes[0]?.saida_profissional_desc}
                       dataFindId={data?.nodes[0].saidas_profissionais}
                   />
            </DetalhesOfertaFormativaProvider>
        </div>
    );
}
//mb-[74px]