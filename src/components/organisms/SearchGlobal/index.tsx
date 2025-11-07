import { DialogTitle } from "@radix-ui/react-dialog";
import { Search, Waypoints } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/atoms/input";
import { ScrollArea } from "@/components/atoms/scroll-area";
import Link from "next/link";
import { Dialog, DialogClose, DialogContent } from "@/components/atoms/dialog";
import { searchSSR } from "@/services/global-search/actions";
import { useDebouncedCallback } from "use-debounce";

interface SearchGlobalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const indexesIcon: any = {
  "dge-service": {
    icon: <Waypoints className="w-4" />,
    title: "Serviços"
  },
  "dge-concurso": {
    icon: <Waypoints className="w-4" />,
    title: "Concursos"
  },
  "dge-oferta-formativa": {
    icon: <Waypoints className="w-4" />,
    title: "Ofertas Formativas"
  },
  "dge-entidades-formadora": {
    icon: <Waypoints className="w-4" />,
    title: "Entidade Formadora"
  },
  "dge-documento": {
    icon: <Waypoints className="w-4" />,
    title: "Documentos"
  },
  "dge-apoios-incentivos": {
    icon: <Waypoints className="w-4" />,
    title: "Apoios Incentivos"
  },
  "dge-qualificacao": {
    icon: <Waypoints className="w-4" />,
    title: "Qualificações"
  },
  "dge-qualificacao-acredit": {
    icon: <Waypoints className="w-4" />,
    title: "Qualificações Acreditada"
  },
  "dge-oferta-emprego-estagio": {
    icon: <Waypoints className="w-4" />,
    title: "Ofertas de Emprego e Estágio"
  },
};

export function SearchGlobal({ open, setOpen }: SearchGlobalProps) {
  const [results, setResults] = useState<{ [key: string]: any[] }>({});
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useDebouncedCallback(async (searchValue: string) => {
    if (searchValue.trim().length > 0) {
      setIsSearching(true);
      const response = await searchSSR(searchValue);
      if (response.success && response.data) {
        setResults(response.data);
      } else {
        setResults({});
      }
      setIsSearching(false);
    } else {
      setResults({});
    }
  }, 300);

  useEffect(() => {
    setResults({});
    setQuery("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showClose={false}
        className="p-0 max-w-[calc(100%-32px)] md:max-w-3xl overflow-hidden rounded-3xl sm:rounded-3xl"
      >
        <DialogTitle className="hidden">
          <span></span>
        </DialogTitle>
        <DialogClose className="hidden">
          <span></span>
        </DialogClose>
        <div className="w-full border-b pb-2">
          <div className="relative px-6 pt-6 pb-2">
            <div className="absolute inset-y-0 left-6 top-4 flex items-center pl-4 text-gray-500 pointer-events-none">
              <Search size={20} />
            </div>
            <Input
              type="search"
              id="default-sear"
              className="w-full rounded-full h-11 border border-input bg-background pl-12 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-nonedisabled:cursor-not-allowed disabled:opacity-50"
              placeholder="¿Pesquisar?"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                debouncedSearch(e.target.value);
              }}
              autoComplete="off"
            />
          </div>
          {isSearching ? (
            <span className="ml-8 text-xs text-neutral-500">Pesquisando...</span>
          ) : Object.values(results).flat().length > 0 ? (
            <span className="ml-8 text-xs text-neutral-500">
              {Object.values(results).flat().length} resultados encontrados
            </span>
          ) : (
            <span className="ml-8 text-xs text-neutral-500">Sem resultados</span>
          )}
        </div>
        {Object.values(results).flat().length > 0 ? (
          <ScrollArea maxH="60vh" className="!h-auto px-3">
            <div className="flex flex-col gap-4 relative h-full pb-16">
              {Object.keys(results).map((indexUid) => (
                <div key={indexUid} className="flex flex-col gap-2">
                  <div className="pl-6 flex items-center gap-2 text-neutral-500">
                    {indexesIcon[indexUid]?.icon}
                    <h3 className="text-sm font-medium">{indexesIcon[indexUid]?.title}</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {results[indexUid]?.map((hit, index) =>
                      !hit?.isExternal ? (
                        <Link key={index} href={hit?.link || "#"} target="_self">
                          <div
                            onClick={() => setOpen(false)}
                            className="flex flex-col w-full pl-6 pr-4 py-3 rounded-xl border hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer transition-all ease-in-out duration-200 text-left"
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              <div
                                className="text-editor line-clamp-2 md:line-clamp-1 font-semibold"
                                dangerouslySetInnerHTML={{
                                  __html: hit?.titulo || hit?.nome || hit?.name || hit?.nome_lider,
                                }}
                              />
                              {indexUid === "sub-causa" && (
                                <>
                                  <span>-</span>
                                  <span className="text-xs text-primary border font-semibold border-dashed w-fit px-2 rounded-full">
                                    {hit?.cause}
                                  </span>
                                </>
                              )}
                            </div>
                            <div
                              className="text-editor line-clamp-1 mt-1 font-normal"
                              dangerouslySetInnerHTML={{
                                __html: hit?.descricao || hit?.resumo || hit?.objetivo_descricao,
                              }}
                            />
                          </div>
                        </Link>
                      ) : (
                        <Link key={index} href={hit?.link || "#"} target="_blank">
                          <div
                            onClick={() => setOpen(false)}
                            className="flex flex-col w-full pl-6 pr-4 py-3 rounded-xl border hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer transition-all ease-in-out duration-200 text-left"
                          >
                            <div className="flex items-center gap-2 flex-wrap">
                              <div
                                className="text-editor line-clamp-2 md:line-clamp-1 font-semibold"
                                dangerouslySetInnerHTML={{
                                  __html: hit?.titulo || hit?.nome || hit?.name || hit?.nome_lider,
                                }}
                              />
                              {indexUid === "sub-causa" && (
                                <>
                                  <span>-</span>
                                  <span className="text-xs text-primary border font-semibold border-dashed w-fit px-2 rounded-full">
                                    {hit?.cause}
                                  </span>
                                </>
                              )}
                            </div>
                            <div
                              className="text-editor line-clamp-1 mt-1 font-normal"
                              dangerouslySetInnerHTML={{
                                __html: hit?.descricao || hit?.resumo || hit?.objetivo_descricao,
                              }}
                            />
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex justify-center pt-16 min-h-[400px] max-h-[60vh]">
            <span className="font-medium text-muted-foreground text-lg">
              Digite algo para pesquisar
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
