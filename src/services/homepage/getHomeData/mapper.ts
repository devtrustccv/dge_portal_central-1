import { youtubeToEmbedUrl } from "@/lib/utils";
import { IHomePageResponse } from "../type";

export const mapper = (data: any): IHomePageResponse | null => {
    if (!data || !data.homePage) return null;

    const { homePage } = data;

    return {
        banner: homePage.banner?.map((banner: any) => ({
            title: banner.title ?? "",
            description: banner.description ?? "",
            image: banner.image ?? { url: "" },
            button: {
                id: banner.button?.id ?? "",
                label: banner.button?.label ?? "",
                url: banner.button?.url ?? null,
                external_link: banner.button?.external_link ?? false,
            
            },
            abrir_simulador: banner.abrir_simulador ?? false
        })) ?? [],

        section_profile: {
            title: homePage.section_profile?.title ?? "",
            description: homePage.section_profile?.description ?? "",
            DadosPerfis: homePage.section_profile?.DadosPerfis?.map((dados: any) => ({
                titulo: dados.titulo ?? "",
                highlight_title_word: dados.highlight_title_word ?? "",
                title_digital_service: dados.title_digital_service ?? "",
                servicos: dados.servicos?.map((servico: any) => ({
                    slug: servico.slug ?? "",
                    title: servico.title ?? "",
                })) ?? [],
                perfi: {
                    name: dados.perfi?.name ?? "",
                    description: dados.perfi?.description ?? "",
                    icon: dados.perfi?.icon ?? { url: "" },
                },
            })) ?? [],
        },

        section_opportunity: {
            id: homePage.section_opportunity?.id ?? "",
            title: homePage.section_opportunity?.title ?? "",
            description: homePage.section_opportunity?.description ?? "",
            highlight_title_word: homePage.section_opportunity?.highlight_title_word ?? "",
            opportunity: homePage.section_opportunity?.opportunity?.map((opp: any) => ({
                id: opp.id ?? "",
                title: opp.title ?? "",
                description: opp.description ?? "",
                sub_title: opp.sub_title ?? "",
                link: opp.link ?? "",
                link_externo: opp.link_externo ?? false,
                number: opp.number ?? 0,
            })) ?? [],
            caroucel: homePage.section_opportunity?.caroucel?.map((item: any) => ({
                id: item.id ?? "",
                title: item.title ?? "",
                description: item.description ?? "",
                button: {
                    label: item.button?.label ?? "",
                    url: item.button?.url ?? null,
                },
                image: item.image ?? { url: "" },
                emphasis: item.emphasis ?? false,
            })) ?? [],
        },

        section_voz_kre_mais: {
            id: homePage.section_voz_kre_mais?.id ?? "",
            title_mobile: homePage.section_voz_kre_mais?.title_mobile ?? { url: "" },
            title_desktop: homePage.section_voz_kre_mais?.title_desktop ?? { url: "" },
            description: homePage.section_voz_kre_mais?.description ?? "",
            questionarios_vos_kres: homePage.section_voz_kre_mais?.questionarios_vos_kres?.map((q: any) => ({
                title: q.title ?? "",
                Questionarios_Links: q.Questionarios_Links?.map((link: any) => ({
                    label: link.label ?? "",
                    url: link.url ?? "",
                    external_link: link.external_link ?? false,
                })) ?? [],
            })) ?? [],
        },

        section_nos_storia: {
            id: homePage.section_nos_storia?.id ?? "",
            title: homePage.section_nos_storia?.title ?? "",
            description: homePage.section_nos_storia?.description ?? "",
            graphic: homePage.section_nos_storia?.graphic?.map((graphic: any) => ({
                id: graphic.id ?? "",
                label: graphic.label ?? "",
                number: graphic.number ?? "",
            })) ?? [],
            testimunhos: homePage.section_nos_storia?.testimunhos?.map((test: any) => ({
                name: test.name ?? "",
                description: test.description ?? "",
                cover: test.cover ?? { url: "" },
                hash_tags: test.hash_tags ?? "",
                url: test.url ? youtubeToEmbedUrl(test?.url) : "",
            })) ?? [],
        },
    };
};
