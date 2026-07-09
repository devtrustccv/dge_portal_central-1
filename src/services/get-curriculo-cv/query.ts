import {gql} from "@apollo/client";

export default gql`
  query CmsCurriculoCvs($filters: CmsCurriculoCvFiltersInput) {
  cmsCurriculoCvs(filters: $filters) {
    email
    content
  }
}
`;