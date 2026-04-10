import {gql} from "@apollo/client";

export default gql`
    query PageDetalhesServico {
      pageDetalhesServico {
        PageInfo {
          configs
          title
          subtitle
          description
          headerImage {
            formats
            url
          }
        }
      }
    }   
`
