import { gql } from "@apollo/client";

export default gql`
query PageRoteiroEmpreg {
  pageRoteiroEmpreg {
    PageInfo {
      id
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
    cards {
      url
      name
      logo {
        url
      }
    }
    soft_skills_info {
      title
      description
      button {
        url
        label
        external_link
      }
    }
    caroucel {
      title
      image {
        url
      }
      emphasis
      description
      button {
        label
        url
        external_link
      }
      abrir_simulador
      id
    }
    createdAt
    updatedAt
    publishedAt
  }
}
`;