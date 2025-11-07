import {IOfertasFormativasData} from "@/services/ofertas/types";

export function mapper(response: any): IOfertasFormativasData | null{
    if (!response) return null;

    const data = response?.ofertasFormativas_connection.nodes;



    return {
          nodes: data?.map((item: any) => ({
              formacao: item.formacao,
              denominacao_entidade: item.denominacao_entidade,
              familia: item.familia,
              carga_horaria: item.carga_horaria,
              valor_propina: item?.valor_propina,
              valor_matricula: item?.valor_matricula,
              concelho: item.concelho,
              condicoes_acesso: item.condicoes_acesso,

              data_fim: item.data_fim,
              data_inicio: item.data_inicio,
              data_avalicao: item?.data_avalicao,
              data_resultado: item?.data_resultado,
              data_inicio_formacao: item?.data_inicio_formacao,
              data_fim_formacao: item?.data_fim_formacao,

              detalhes_oferta: item.detalhes_oferta,
              documentId: item.documentId,
              slug: item.slug,
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
              url_logo_entidade: item?.url_logo_entidade || "",
              website_entidade: item?.website_entidade || "",

              documentos_necessarios: item.documentos_necessarios?.map((doc: any) => ({
                  id: doc?.id,
                  label: doc?.label,
                  url: doc?.url,
                  file: {
                      documentId: doc?.documentId,
                      url: doc?.url
                  }
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

              criterio_selecao: item?.criterio_selecao?.map((saida: any) => ({
                  id: saida?.id,
                  label: saida?.label
              })),
          })),
    }

}