'use client'
import {Banner} from "@/components/atoms/banner";
import InfoCard from "@/components/atoms/info-card";
import {formatDate} from "@/lib/utils";
import SectionRequisitos from "@/components/molecules/ProcessoAcreditacao/sectionRequisitos";
import {IOfertaEmprego} from "@/services/ofertas-emprego/type";
import {IPageInfoModal} from "@/services/page-detalhe-oferta/type";
import {useNavigation} from "@/context/NavigationContext";
import {useRouter} from "next/navigation";
import {setCookie} from "nookies";

export function DetailEmpregoAndEstagio({
  item,
  pageInfoDetail
}: {
    item: IOfertaEmprego
    pageInfoDetail: IPageInfoModal | undefined | null
}){
    const { hasSession } = useNavigation();
    const router = useRouter()
    const handleLogin = () => {
        const redirectPath = `${process.env.NEXT_PUBLIC_SITE_URL}/ofertas-formativas/candidatura?cursos=${item?.documentId}`;
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
        <div className="space-y-10 mb-10">
            <Banner
                key={item?.documentId}
                title={pageInfoDetail?.pageInfo.title || 'Emprego'}
                subTitle={`${pageInfoDetail?.pageInfo.subtitle || ''} - ${item?.title || ''}`}
                subTitle2={""}
                image={pageInfoDetail?.pageInfo?.headerImage?.url || "/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png"}
            >
                <button
                    onClick={() => {
                        if (hasSession) {
                            router.push(`/ofertas-formativas/candidatura?cursos=${item?.documentId}`);
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

            <div className="container space-y-10 lg:space-y-20">
                <div>
                    <h1 className="font-poppins mb-6 font-medium text-[32px] md:text-[44px] text-[#334155] leading-[42px] md:leading-[56px] tracking-[0%]">
                        {item.title}
                    </h1>
                    <div
                        className="text-editor text-[#616E85]"
                        dangerouslySetInnerHTML={{__html: item.description ?? ""}}
                    />
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4 mt-6">
                        <InfoCard label="Horário" value={item.horario}/>
                        <InfoCard label="Modelo de Trabalho" value={item.modelo}/>
                        <InfoCard label="Duração" value={item.duracao}/>
                        <InfoCard
                            label="Local de Trabalho"
                            value={`${item.concelho}, ${item.ilha}`}
                        />
                        <InfoCard label="Nº Vagas" value={item.n_vagas?.toString()}/>
                        <InfoCard
                            label="Período de Candidatura"
                            value={`De ${formatDate(item.inicio_candidatura ?? "", {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                            })} a ${formatDate(item.fim_candidatura ?? "", {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                            })}`}
                        />
                        <InfoCard
                            label="Idiomas"
                            value={item.idiomas?.map((i) => i.label)?.join(", ")}
                        />
                    </div>
                </div>

                {item.tabs_definicao?.title && (
                    <div className="">
                        <SectionRequisitos
                            geral={{
                                title: item.tabs_definicao.title,
                                description: item.tabs_definicao.description ?? "",
                                tabs: (item.tabs_definicao.tabs ?? []).map((tab) => ({
                                    label: tab.label ?? "",
                                    description: tab.description ?? "",
                                    list_contents:
                                        tab.list_contents?.map((c) => ({
                                            questions: c.questions ?? "",
                                            response: c.response ?? "",
                                        })) ?? [],
                                })),
                            }}
                        />
                    </div>

                )}
            </div>
        </div>
    )
}