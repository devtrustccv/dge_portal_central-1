import {IPageCandidatura} from "@/services/page-candidatura/types";

export const mapper = (response: any): IPageCandidatura | null => {
    if (!response?.pageEfetuarCandidOFormativa) return null;

    const data = response.pageEfetuarCandidOFormativa;

    return {
        configs: data?.PageInfo?.configs || {},
        headerImage: {
            formats: data?.PageInfo?.headerImage?.formats || {},
            url: data?.PageInfo?.headerImage?.url || "/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png",
        },
        title: data?.PageInfo?.title || "",
        subtitle: data?.PageInfo?.subtitle || "",
        description: data?.PageInfo?.description || "",
        cms_topico: data?.PageInfo?.cms_topico
            ? {
                name: data.PageInfo.cms_topico?.name ?? "",
                slug: data.PageInfo.cms_topico?.slug ?? "",
            }
            : { name: "", slug: "" },
        termo_aceitacao : data?.termo_aceitacao || "",
    };
};
