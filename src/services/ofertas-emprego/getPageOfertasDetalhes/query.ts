import { gql } from "@apollo/client";

export default gql`
  query PageDetalhesOfertaEmpregoEstagio {
    pageDetalhesOfertaEmpregoEstagio {
      documentId
      PageInfo {
        title
        subtitle
        subtitle2
        headerImage {
          url
        }
        description
        configs
        cms_topico {
          slug
          name
        }
      }
      saiba_mais {
        url
        url_externo
        title
        button_label
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
`;
