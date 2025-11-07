import { IGraphic } from "@/services/homepage/type";
import React from "react";


interface NosStoriaGraphicProps extends IGraphic {

}

export const GraphicItem: React.FC<NosStoriaGraphicProps> = (graphic) => {
    return (
        <div className="max-h-[134px] border-[1px] rounded-[16px] md:rounded-[28px] p-6 flex flex-col justify-between h-full relative">
            <span className="h-1/2 text-sm md:text-base leading-[16px] md:leading-[20px]  font-light">{graphic.label}</span>
            <h4 className="text-[36px] max-md:text-[42px] lg:text-5xl text-main-black  md:font-light leading-[60px] mt-1 md:mt-2">{graphic.number}</h4>
        </div>
    );
}