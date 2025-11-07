import { ICandidatoResponse } from "@/app/(layout-with-banner)/ofertas-formativas/candidatura/actions";
import { PessoaInfo } from "@/context/NavigationContext";
import { IDominioProps } from "@/services/dominios/dominio.interface";
import { IOfertaFormativaListItem } from "@/services/ofertas/types";

export interface ICursosPorps {
  cursoCandatoId: number,
  qualifOfertaId: number,
  ordemPreferencia: number,
  denominacaoQualif: string,
  nomeEntidade: string,
  concelho: string,
  dataFim: string,
  dataInicioCurso: string,
  nivel: string,
}
export interface IEnderecoProps {
  id: number,
  ilhaId: string,
  ilha: string,
  concelhoId: string,
  concelho: string,
  morada: string,
  candidatoId: number,
  status: string,
  enderecoAtual: string,
  date_create: string,
}
export interface OptionsProps {
  sexo: IDominioProps[];
  tipo_contato: IDominioProps[];
  periodo: IDominioProps[];
  area_studo: IDominioProps[];
  sim_nao: IDominioProps[];
  grau_academico: IDominioProps[];
  proprietario_cont: IDominioProps[];
  problemasSaude: IDominioProps[];
}

export interface CandidaturaPageProps {
  cursos: IOfertaFormativaListItem[];
  options: OptionsProps;
  user: PessoaInfo;
  candidaturaDetalhe?: ICandidatoResponse | null;
}
