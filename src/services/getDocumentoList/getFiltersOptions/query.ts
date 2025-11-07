import { gql } from "@apollo/client";

export default gql`
query Documentos{
  tipoDocumentos {
    title
      codigo
  }
  topicServices {
    name
      slug
  }
  activePolicies {
    label
    slug
  }
  documentos {
    title
    publishedAt
  }
}
`;
