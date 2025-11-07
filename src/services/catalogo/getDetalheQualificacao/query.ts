import {gql} from "@apollo/client";

export default gql `
    query CmsQualificacaos_connection($pagination: PaginationArg, $certificadoPagination2: PaginationArg, $entidadesConnectionPagination2: PaginationArg, $cmsQualificacaosConnectionPagination2: PaginationArg, $filters: CmsQualificacaoFiltersInput) {
        cmsQualificacaos_connection(pagination: $cmsQualificacaosConnectionPagination2, filters: $filters) {
            nodes {
                documentId
                slug
                nivel
                name
                description
                codigo_qualificacao
                escolaridade_min
                familia
                questions {
                    id
                    questions
                    response
                }
                programaFormativo {
                    formats
                }
                formacao(pagination: $pagination) {
                    id
                    denominacao
                    label
                }
                certificado(pagination: $certificadoPagination2) {
                    id
                    denominacao
                    label
                }
                entidades_connection(pagination: $entidadesConnectionPagination2) {
                    nodes {
                        name
                        concelho
                        zona
                        ilha
                        documentId
                        formacoes {
                            name
                            nivel
                            familia
                            metodologia
                            modalidade
                            num_alvara
                        }
                    }
                }
                SaibaMais {
                    id
                    title
                    url
                    url_externo
                    button_label
                }
            }
            pageInfo {
                page
                pageCount
                pageSize
                total
            }
        }
    }
`