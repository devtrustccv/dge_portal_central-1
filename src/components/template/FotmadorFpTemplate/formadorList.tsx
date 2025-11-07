import {Card, CardDescription, CardTitle} from "@/components/atoms/card";
import Link from "next/link";
import {GoArrowRight} from "react-icons/go";


const FormadorList: React.FC<{
    formadores?: {
        location : string;
        name: string;
        button: {
            label: string;
            url: string;
            external_link : boolean;
        }

    }[]
    className? : string
}> = ({ formadores, className }) => {

    return (
        <div className={className}>
            {formadores?.map((item, index) => (
                <Card
                    key={index}
                    className="w-full  rounded-[16px] gap-[20px] border-[0.5px] p-[16px] shadow-none overflow-hidden"
                >
                    <div className="min-h-[106px] flex flex-col justify-between">
                        <div className="flex flex-col gap-4">
                            <CardDescription className="font-poppins uppercase font-medium text-[12px] md:max-text-[14px] leading-[14px] tracking-[0%]">
                                {item?.location}
                            </CardDescription>
                            <CardTitle className="font-poppins font-medium text-[14px] text-[#334155] md:text-[16px] leading-[24px] tracking-[0%] capitalize ">
                                {item.name}
                            </CardTitle>
                        </div>
                        <Link href={item?.button.url}  target={item?.button?.external_link ? '_blank' : '_self'}>
                            <button className="bg-[#0454A01A] text-[#0454A0] w-auto px-6 flex items-center justify-center  h-[30px] border-1 rounded-[8px] gap-[8px]  shadow-none">
                                <p className="font-poppins font-normal text-[12px] md:text-[14px]  tracking-[0%] uppercase">
                                    {item?.button?.label}
                                </p>
                                <GoArrowRight />
                            </button>
                        </Link>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default FormadorList;
