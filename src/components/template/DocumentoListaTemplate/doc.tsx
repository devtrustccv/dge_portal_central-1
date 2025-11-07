import {Card} from "@/components/atoms/card";
import Image from "next/image";
import Link from "next/link";
import {IDocumentoNode} from "@/services/getDocumentoList/types";
import {Separator} from "@/components/atoms/separator";


// Função para formatar a data no formato dd-MM-yyyy
function formatarData(publishedAt?: string) {
    if (!publishedAt) return "Data não disponível";
    const data = new Date(publishedAt); // Cria um objeto Date a partir do string ISO

    const dia = data.getDate().toString().padStart(2, '0'); // Garantir que o dia tenha 2 dígitos
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mes começa do 0, então somamos 1
    const ano = data.getFullYear();

    return `${dia}-${mes}-${ano}`; // Retorna a data no formato dd-MM-yyyy
}

interface DocumentosProps{
    documentos : IDocumentoNode[]
    className: string,
}

const DocComponente : React.FC<DocumentosProps>=({documentos, className}) =>{
    const getFileIcon = (url: string) => {
        if (!url) return "assets/docLogo.svg"; // Se não houver URL, retorna o ícone padrão

        const fileExtension = url.split(".").pop()?.toLowerCase(); // Pega a extensão do arquivo

        return fileExtension === "pdf" ? "assets/pdf.svg" : "assets/docLogo.svg";
    };
    return(
        <div className={className}>
            {documentos?.map((item, index) => (
                <Card
                    key={index}
                    className="w-full flex flex-col md:flex-row justify-between shadow-none border-[0.5px] rounded-2xl p-2 lg:items-center"
                >                    <div className="flex items-center gap-1 md:gap-4">
                        <Image
                            src={getFileIcon(item.url || item.fifle?.url)}
                            alt={"docImage"}
                            width={57}
                            height={56}
                            sizes="57px"
                        />

                        <div>
                            <div className="flex gap-1 items-center">
                                <p className="font-poppins font-normal text-[12px] text-[#BFC4CD] leading-[24px] tracking-[0%]">
                                    {item.tipo_documento?.title}
                                </p>

                                {item?.publishedAt && (
                                    <Separator orientation="vertical" className="h-[15px] hidden md:flex"/>
                                )}

                                {item?.publishedAt &&(
                                    <p className="font-poppins font-normal text-[12px] text-[#BFC4CD] leading-[24px] tracking-[0%]">
                                        {`Publicado em ${item?.publishedAt ? formatarData(item.publishedAt) : ""}`}
                                    </p>
                                )}

                            </div>
                            <p className="font-poppins font-medium text-[14px] md:text-[16px] text-[#334155] leading-[20px] md:leading-[30px] tracking-[2%]">
                                {item?.title}
                            </p>
                        </div>
                    </div>
                    <Link href={item?.url || item.fifle?.url || ""} target={"_blank"}
                          className="w-full md:w-[157px] h-[32px] rounded-[10px] bg-[#0454A0] flex items-center justify-center text-white mt-2 md:mt-0">
                        <p className="font-poppins font-normal text-[12px] md:text-[14px] leading-[24px] tracking-[0%] text-center">
                            Pre-visualizar
                        </p>
                    </Link>
                </Card>
            ))}

        </div>
    )
}
export default DocComponente;