import { gql } from "@apollo/client";

export default gql`
query ListaOfertaFormativa {
  listaOfertaFormativa {
    PageInfo {
      id
      title
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