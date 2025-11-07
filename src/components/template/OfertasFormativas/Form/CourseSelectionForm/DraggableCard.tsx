import { CardFormacaoItem } from "@/components/organisms/OfertaFormativas/components/features/CoreComponent";
import { IOfertaFormativaListItem } from "@/services/ofertas/types";
import {
    useDraggable
} from "@dnd-kit/core";
export function DraggableCard({ id, curso }: { id?: string; curso: IOfertaFormativaListItem }) {
    const { setNodeRef, attributes, listeners, transform } = useDraggable({ id: id || "" });
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="w-full"
            style={{
                transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "none",
            }}
        >
            <CardFormacaoItem
                isSelect={false}
                showAllInfo
                item={{
                    referencia_formacao: curso.referencia_formacao,
                    documentId: curso.documentId,
                    slug: curso.slug,
                    formacao: curso.formacao,
                    denominacao_entidade: curso.denominacao_entidade,
                    url_logo_entidade: curso.url_logo_entidade,
                    duracao: curso.duracao,
                    periodo_formacao: curso.periodo_formacao,
                    nivel: curso.nivel
                }}
                target="_blank"
            />
        </div>

    );
}
