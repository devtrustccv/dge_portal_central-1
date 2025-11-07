import { Card } from "@/components/atoms/card";
import { Separator } from "@/components/atoms/separator";
import { IFormacao} from "@/services/entidades/entidades/types";

interface FormacoesProps{
    dataFind : IFormacao[]
}

const SectionFormacoes: React.FC<FormacoesProps> = ({ dataFind }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {dataFind?.map((item, index) => (
                <Card
                    key={index}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center min-h-[93px] p-4 shadow-none border border-gray-200 rounded-2xl"
                >
                    <div className="flex sm:flex-wrap md:flex-col items-center text-center gap-2">
                        <p className="font-poppins text-sm sm:text-[12px] lg:text-[16px] text-[#0454A0]">
                            Nivel
                        </p>
                        <p className="font-poppins text-xl sm:text-[28px] text-[#0454A0]">
                            {item?.nivel}
                        </p>
                    </div>

                    <Separator
                        orientation="vertical"
                        className="hidden sm:block h-12 w-[2px] bg-gray-300"
                    />

                    <div className="w-full flex flex-col gap-3 sm:gap-4">
                        <div className="flex sm:flex-wrap md:flex justify-between gap-2">
                            <p className="font-poppins text-sm sm:text-base text-[#0D1421]">
                                {item?.name}
                            </p>
                            <p className="font-poppins text-sm sm:text-base text-[#0D1421]">
                                {item?.familia}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-between gap-2">
                            <p className="font-poppins text-sm sm:text-base text-[#616E85] flex gap-1">
                                <span>Metodologia:</span>
                                <span className="font-medium">{item?.metodologia}</span>
                            </p>
                            <p className="font-poppins text-sm sm:text-base text-[#616E85] flex gap-1">
                                <span>Modalidade:</span>
                                <span className="font-medium">{item?.modalidade}</span>
                            </p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>

    );
}
export default SectionFormacoes;