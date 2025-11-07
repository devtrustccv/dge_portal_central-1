
export const mapConcursos = (hit: any) => ({
    id: hit.id,
    titulo: hit._formatted?.title || "",
    descricao: hit._formatted.concurso_description || "",
    link: "/concursos-e-editais/" + hit?.slug || "",
    isExternal: false,
});
