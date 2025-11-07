export const mapOfertaEmpregoEstagio = (hit: any) => ({
    id: hit.id,
    titulo: hit._formatted?.title || "",
    descricao: hit._formatted.description || "",
    link: "/emprego/ofertas/" + hit?.slug || "",
    isExternal: false,
});