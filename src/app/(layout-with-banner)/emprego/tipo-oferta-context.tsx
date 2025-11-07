"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type TipoOfertaContextType = {
  tipoOferta: string;
  setTipoOferta: (tipo: string) => void;
};

const TipoOfertaContext = createContext<TipoOfertaContextType | undefined>(
  undefined
);

export function TipoOfertaProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tipoOferta, setTipoOferta] = useState(() => {
    return searchParams.get("tipo_oferta") || "emprego";
  });

  useEffect(() => {
    if (searchParams.get("tipo_oferta"))
      setTipoOferta(searchParams.get("tipo_oferta")??"emprego" );
  }, [pathname, searchParams]); 

  
  return (
    <TipoOfertaContext.Provider value={{ tipoOferta, setTipoOferta }}>
      {children}
    </TipoOfertaContext.Provider>
  );
}

export function useTipoOferta() {
  const context = useContext(TipoOfertaContext);
  if (!context) {
    throw new Error("useTipoOferta must be used within a TipoOfertaProvider");
  }
  return context;
}
