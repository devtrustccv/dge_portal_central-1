import {TabsList, TabsTrigger} from "@/components/atoms/tabs";

const style = "w-full h-[36px] md:px-1 lg:px-4 text-md lg:text-lg rounded-[13px] text-[#616E85] data-[state=active]:text-[#334155] data-[state=active]:bg-[#FFFFFF] whitespace-nowrap"
export function OfertaTabsList(){

    const date = new Date();
    return(
        <TabsList className="grid w-full h-[44px] grid-cols-3 bg-[#EFF2F5] text-[#616E85]">
            <TabsTrigger value="ativas" className={style}>
                Candidaturas Abertas
            </TabsTrigger>

            <TabsTrigger value="formacao_prevista" className={style}>
               Formações Prevista para {date?.getFullYear()}
            </TabsTrigger>

            <TabsTrigger value="arquivada" className={style}>
                Formações em Execução
            </TabsTrigger>
        </TabsList>
    )
}