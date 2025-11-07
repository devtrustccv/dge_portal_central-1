import { Card } from "@/components/atoms/card";
import Link from "next/link";
import { IConcursoNode } from "@/services/concursos/types";

function formatarData(data_publicacao?: string) {
  if (!data_publicacao) return "Data não disponível";
  const data = new Date(data_publicacao); // Cria um objeto Date a partir do string ISO

  const dia = data.getDate().toString().padStart(2, '0'); // Garantir que o dia tenha 2 dígitos
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mes começa do 0, então somamos 1
  const ano = data.getFullYear();

  return `${dia}-${mes}-${ano}`; // Retorna a data no formato dd-MM-yyyy
}

interface ConcursoProps {
  concursos: IConcursoNode[];
  cols?: number;
}

const ConcursoList: React.FC<ConcursoProps> = ({ concursos, cols=2 }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-${cols} gap-4`}>
      {concursos?.map((item, index) => (
        <Card
          key={index}
          className="flex flex-col justify-between min-h-[278px] p-4 md:p-6 shadow-none border-[0.5px] border-[#BFC4CD] gap-2"
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between mb-2">
              <p className="font-poppins font-medium text-[14px] text-[#BFC4CD] leading-[22px] tracking-[1%] uppercase ">
                {`Publicado em ${item?.data_publicacao ? formatarData(item.data_publicacao) : ""}`}
              </p>
              {/* Exibir "ABERTO" se item.state for true, senão mostrar "ENCERRADO" */}
              {item.estado ? (
                  <div
                      className="w-[87px] h-[28px] rounded-[8px] border-[1px] border-[#61C3A8] flex justify-center items-center text-[#61C3A8] font-semibold text-[12px]">
                    <span>ABERTO</span>
                  </div>
              ) : (
                  <div
                      className="w-[87px] h-[28px] rounded-[8px] border-[1px] border-[#DE5252] flex justify-center items-center text-[#DE5252] font-semibold text-[12px]">
                    <span>ENCERRADO</span>
                  </div>
              )}
            </div>
            <p className="font-poppins font-medium text-[20px] text-[#334155] leading-[28px] tracking-[1%]">
              {item?.title}
            </p>
            <p className="font-poppins font-light text-[16px] text-[#334155] leading-[22px] tracking-[1%] capitalize">
              {item?.edital}
            </p>
            <p className="font-poppins font-light text-[16px] text-[#616E85] leading-[22px] tracking-[3%] line-clamp-3">
              {item?.concurso_description}
            </p>
          </div>
          <Link href={`/concursos-e-editais/${item?.slug}`}>
            <button
                className="w-full h-[38px] text-center bg-[#0454A01A] rounded-[8px] text-[#0454A0] text-[16px] font-normal mt-2">
              Ver Detalhes
            </button>
          </Link>
        </Card>
      ))}
    </div>
  );
};
export default ConcursoList;
