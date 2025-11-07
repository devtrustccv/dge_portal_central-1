import {gql} from "@apollo/client";

export default gql`
query ApoioEIncentivos($filters: ApoioEIncentivoFiltersInput) {
  apoioEIncentivos (filters: $filters) {
   slug
    title
    description
    tabs {
      title
      description
      tabs {
        label
        description
        list_contents {
          questions
          response
        }
      }
    }
    medida
    session_entity {
      title
      description
      image {
      formats
      url  
      }
      button {
        label
        url
        external_link
      }
    }
    cms_topico {
      slug
      name
    }
    saiba_mais {
      title
      url
      button_label
    }
    image {
    formats
    url  
    }
  }
}
`