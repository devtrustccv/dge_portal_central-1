
export const mapQualificacao = (hit: any) => ({
    id: hit.id,
    titulo: hit._formatted?.name || "",
    descricao: hit._formatted.description || "",
    link: "/catalogo-nacional-qualificacoes/" + hit?.slug || "",
    isExternal: false,
});
