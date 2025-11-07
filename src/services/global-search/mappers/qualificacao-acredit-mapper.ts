export const mapQualificacaoAcredit = (hit: any) => ({
    id: hit.id,
    titulo: hit._formatted?.name || "",
    descricao: hit._formatted.familia || "",
    link: "/formacao-profissional-acreditada/" ,
    isExternal: false,
});
