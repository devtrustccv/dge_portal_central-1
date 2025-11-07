import { gql } from "@apollo/client";

export default gql`
query getDataPageHome {
  homePage {
    banner {
      title
      description
      image {
        formats
        url
      }
      button {
        id
        label
        url
        external_link
      }
      abrir_simulador
    }
    section_profile {
      title
      description
      DadosPerfis {
        titulo
        highlight_title_word
        title_digital_service
        servicos{
            slug
            title
        }
        perfi {
          name
          description
          icon {
            url
          }
        }
      }
    }
    section_opportunity {
      id
      title
      description
      highlight_title_word
      opportunity {
        id
        title
        description
        sub_title
        number
        link
        link_externo
      }
      caroucel {
        id
        title
        description
        button {
          label
          url
          external_link
        }
        image {
          formats
          url
        }
        emphasis
      }
    }

    section_voz_kre_mais {
      id
      title_mobile {
        url
      }
      title_desktop {
        url
      }
      description
      questionarios_vos_kres {
        title
        Questionarios_Links {
          label
          url
          external_link
        }
      }
    }

    section_nos_storia {
      id
      title
      description
      graphic {
        id
        label
        number
      }
      testimunhos(sort: "publishedAt:asc") {
        name
        description
        cover {
          formats
          url
        }
        hash_tags
        url
      }
    }
  }
}
`;