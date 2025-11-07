import { gql } from "@apollo/client";

export default gql`
 mutation CreateEvaluationService($data: EvaluationServiceInput!) {
  createEvaluationService(data: $data) {
    documentId
  }
}
`;
