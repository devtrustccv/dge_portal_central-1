
export const mapEntidadesFormadora = (hit: any) => ({
    id: hit.id,
    titulo: hit._formatted?.name || "",
    descricao: hit._formatted?.zona || "",
    link: "/entidades-formadorasofertas-formativas/" + hit?.slug || "",
    isExternal: false,
});
