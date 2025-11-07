import { gql } from "@apollo/client";

export default gql`
query ProgramasEmpresarials {
  programasEmpresarials {
    url
    title
    image_url
    description
    image {
      url
      name
    }
  }
}
`;