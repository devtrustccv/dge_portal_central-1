import {gql} from "@apollo/client";

export default gql`
  query CmsCurriculoCvs {
  cmsCurriculoCvs {
    email
    content
  }
}
`;