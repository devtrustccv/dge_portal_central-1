
export const mapDocumento = (hit: any) => ({
    id: hit.id,
    titulo: hit._formatted?.title || "",
    descricao: hit._formatted.tipo_documento || "",
    link: hit?.url || "",
    isExternal: true,
});
