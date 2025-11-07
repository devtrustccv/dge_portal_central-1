
export const mapOfertasFormativas = (hit: any) => ({
    id: hit.id,
    titulo: hit._formatted?.formacao || "",
    descricao: hit._formatted?.detalhes_oferta || "",
    link: "/ofertas-formativas/" + hit?.slug || "",
    isExternal: false,
});
