
export const mapApoiosIncentivos = (hit: any) => ({
    id: hit.id,
    titulo: hit._formatted?.title || "",
    descricao: hit._formatted.description || "",
    link: "/apoio-incentivo/" + hit?.slug || "",
    isExternal: false,
});
