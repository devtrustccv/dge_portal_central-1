import { createContext } from "react";
import { IOfertaFormativa } from "@/services/ofertas/types";

interface DetailContextProps {
    children: React.ReactNode;
    data: IOfertaFormativa[];
}

const DetailContext = createContext<IOfertaFormativa[]>([]);

export const DetalhesOfertaFormativaProvider = ({ children, data }: DetailContextProps) => {
    return (
        <DetailContext.Provider value={data}>
            {children}
        </DetailContext.Provider>
    );
};

export default DetailContext;
