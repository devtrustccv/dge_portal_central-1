import { gql } from "@apollo/client";

export default gql`
  query OfertaEmpregoEstagios(
    $filters: OfertaEmpregoEstagioFiltersInput
    $pagination: PaginationArg
  ) {
    ofertaEmpregoEstagios_connection(filters: $filters, pagination: $pagination) {
      nodes {
        documentId
        ilha
        concelho
        area_profissional
        entidade
        duracao
        fim_candidatura
        horario
        idiomas {
          label
        }
        inicio_candidatura
        modelo
        n_vagas
        ref_oferta
        slug
        title
        description
        tabs_definicao {
          description
          title
          tabs {
            label
            description
            list_contents {
              questions
              response
            }
          }
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
`;
