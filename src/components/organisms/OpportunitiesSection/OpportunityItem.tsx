import React from "react";
import Icon from "../../atoms/Icons";
import { Separator } from "../../atoms/separator";
import { IOpportunity } from "@/services/homepage/type";


interface OpportunityItemProps extends IOpportunity {

}

export const OpportunityItem: React.FC<OpportunityItemProps> = (opportunity) => {
    return (
        <div className="bg-[#F8FAFC] rounded-[24px] md:rounded-[40px] p-8 flex flex-col justify-between h-full relative">

            <h3 className="text-2xl 3xl:text-3xl font-semibold text-main-black break-words">{opportunity.title}</h3>
            <div className=" 3xl:h-[124px] w-full relative">
                <p className="leading-7 mt-2 line-clamp-2 3xl:line-clamp-4">{opportunity.description}</p>
            </div>
            <Separator className="mt-6 mdmt-10" />
            <div className="mt-4 ">
                <span className="text-sm">{opportunity.sub_title}</span>
                <div className="flex  justify-between items-center mt-2">
                    <h4 className="text-4xl 3xl:text-6xl text-main-black font-[300]">{opportunity.number}</h4>
                    <Icon name="arrow-rigth" className="text-main-black" />
                </div>
            </div>
        </div>
    );
}

