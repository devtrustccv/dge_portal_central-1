import { gql } from "@apollo/client";

export default gql`
query PageListaOfertaFormativaArquivada {
  pageListaOfertaFormativaArquivada {
    PageInfo {
      id
      title
      subtitle2
      subtitle
      headerImage {
        formats
      }
      configs
    }
    SaibaMais {
      id
      title
      url
      url_externo
      button_label
    }
  }
}
`;