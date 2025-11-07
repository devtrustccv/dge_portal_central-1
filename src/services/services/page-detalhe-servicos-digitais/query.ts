import {gql} from "@apollo/client";

export default gql`
    query PageDetalhesServico {
      pageDetalhesServico {
        PageInfo {
          title
          headerImage {
            formats
          }
        }
      }
    }   
`