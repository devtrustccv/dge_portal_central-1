
export const mapServices = (hit: any) => ({
    id: hit.id,
    titulo: hit._formatted?.title || "",
    descricao: hit._formatted.description || "",
    link: "/servicos/" + hit?.slug || "",
    isExternal: false,
});
