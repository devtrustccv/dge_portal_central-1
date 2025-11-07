import {IOfertasFormativasData} from "@/services/ofertas/types";

export function mapper(response: any): IOfertasFormativasData | null{
    if (!response) return null;

    const data = response?.ofertasFormativas_connection.nodes;



    return {
          nodes: data?.map((item: any) => ({
              codigo_qualificacao: item?.codigo_qualificacao,
              formacao: item.formacao,
              denominacao_entidade: item.denominacao_entidade,
              famila: item.famila,
              carga_horaria: item.carga_horaria,
              concelho: item.concelho,
              condicoes_acesso: item.condicoes_acesso,

              data_fim: item.data_fim,
              data_inicio: item.data_inicio,

              detalhes_oferta: item.detalhes_oferta,
              documentId: item.documentId,
              hora_fim: item.hora_fim,
              hora_inicio: item.hora_inicio,
              ilha: item.ilha,
              metodologia: item.metodologia,
              nif_entidade: item.nif_entidade,
              nivel: item.nivel,
              numero_vagas: item.numero_vagas,
              duracao: item?.duracao,
              modalidade: item?.modalidade,
              periodo_formacao: item?.periodo_formacao,
              referencia_formacao: item?.referencia_formacao,
              texto_informativo: item?.texto_informativo,
              saida_profissional_desc: item?.saida_profissional_desc,
              url_logo_entidade: item?.url_logo_entidade,
              website_entidade: item?.website_entidade,

              documentos_necessarios: item.documentos_necessarios?.map((doc: any) => ({
                  id: doc?.id,
                  label: doc?.label
              })),

              programa_formativo: item?.programa_formativo?.map((programa: any) => ({
                  id: programa?.id,
                  title: programa?.denominacao,
                  description: programa?.label
              })),

              saidas_profissionais: item?.saidas_profissionais?.map((saida: any) => ({
                  id: saida?.id,
                  label: saida?.label
              })),
          })),
    }

}