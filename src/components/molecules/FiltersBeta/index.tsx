"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/atoms/accordion";
import { Checkbox } from "@/components/atoms/checkbox";
import { Button } from "@/components/atoms/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { Input } from "@/components/atoms/input";
import {useCallback, JSX, useEffect} from "react";
import { X } from "lucide-react";

import Datepicker from "react-tailwindcss-datepicker";

export interface FilterOption {
  type?: "group" | "nested" | "select" | "date" | "checkbox";
  value: string;
  label?: string;
  items?: {
    value: string;
    label?: string;
    items?: { value: string; label?: string }[];
  }[];
}

interface SidebarFilterProps {
  data: FilterOption[];
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

type DateRangeFilterProps = {
  label?: string;
  value?: string;
};

type FilterChangeCallbackProps = {
  key: string;
  value: string;
  isCheckbox?: boolean;
};

export function SidebarFilter({
  data,
  isMobile,
  onCloseMobile,
}: SidebarFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getCurrentFilters = (): Record<string, string[]> => {
    const paramsObj: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value.split("&");
    });
    return paramsObj;
  };

  const currentFilters = getCurrentFilters();

  const scrollToFilterElement = () => {
    const el = document.getElementById("filter-section");
    const elTop = el?.offsetTop;
    window.scrollTo({ top: elTop ? elTop - 100 : 0, behavior: "smooth" });
  };

  const handleFilterChange = useCallback(
    (filters: FilterChangeCallbackProps | FilterChangeCallbackProps[]) => {
      const params = new URLSearchParams(searchParams);
      params.delete("page");

      const processFilter = ({
        key,
        value,
        isCheckbox = false,
      }: {
        key: string;
        value: string;
        isCheckbox?: boolean;
      }) => {
        const existingValues = params.get(key)?.split("&") || [];
        let newValues: string[];

        if (isCheckbox) {
          newValues = existingValues.includes(value)
            ? existingValues.filter((v) => v !== value)
            : [...existingValues, value];
        } else {
          newValues = value.trim() ? [value] : [];
        }

        if (newValues.length > 0) {
          params.set(key, newValues.join("&"));
        } else {
          params.delete(key);
        }
      };

      (Array.isArray(filters) ? filters : [filters]).forEach(processFilter);

      router.replace(`?${params.toString()}`, {
        scroll: false,
      });

      setTimeout(() => {
        scrollToFilterElement()
        // Add Kevin Sousa => Fecha auto logo ao filtrar em mobile
        if (isMobile && onCloseMobile) {
          onCloseMobile();
        }
      },100);
    },
    [router, searchParams]
  );

  const clearFilters = () => {
    router.replace("?");
    setTimeout(() => {
      scrollToFilterElement()
    }, 100);
  };

  const hasAnyFilter = Array.from(searchParams.keys()).length > 0;

  const renderers: Record<
    "group" | "nested" | "select" | "date" | "checkbox" | "daterange",
    (item: FilterOption) => JSX.Element | null
  > = {
    group: (item) => (
      <div
        key={item.value}
        className="font-poppins font-semibold text-lg text-[#334155] mt-2"
      >
        {item.label}
      </div>
    ),

    nested: (item) => (
      <AccordionItem key={item.value} value={item.value}>
        <AccordionTrigger hasResponse className="font-poppins font-medium text-[18px] text-[#334155] leading-[27px] tracking-[0]">
          {item.label}
        </AccordionTrigger>
        <AccordionContent className="text-[#616E85] font-poppins text-[16px] font-normal leading-normal capitalize">
          <Accordion type="multiple" className="flex flex-col gap-2">
            {item.items?.map((option) => (
              <AccordionItem
                key={option.value}
                value={option.value}
                className="border-none"
              >
                {option.items ? (
                  <div>
                    <AccordionTrigger hasResponse className="px-6 font-poppins font-normal text-[16px] leading-[24px] tracking-[0px]">
                      <div
                        className="text-editor"
                        dangerouslySetInnerHTML={{ __html: option.label || "" }}
                      />
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                      {option.items.map((sub) => (
                        <div
                          key={sub.value}
                          className="flex items-center gap-4 px-6 pl-12"
                        >
                          <Checkbox
                            checked={
                              currentFilters[item.value]?.includes(sub.value) ||
                              false
                            }
                            onCheckedChange={() =>
                              handleFilterChange({
                                key: item.value,
                                value: sub.value,
                                isCheckbox: true,
                              })
                            }
                            id={sub.value}
                          />
                          <label
                            htmlFor={sub.value}
                            className="font-poppins font-normal leading-[24px] tracking-[0] cursor-pointer"
                            dangerouslySetInnerHTML={{
                              __html: sub.label || "",
                            }}
                          />
                        </div>
                      ))}
                    </AccordionContent>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 px-6">
                    <Checkbox
                      checked={
                        currentFilters[item.value]?.includes(option.value) ||
                        false
                      }
                      onCheckedChange={() =>
                        handleFilterChange({
                          key: item.value,
                          value: option.value,
                          isCheckbox: true,
                        })
                      }
                      id={option.value}
                    />
                    <label
                      htmlFor={option.value}
                      className="font-poppins font-normal leading-[24px] tracking-[0] cursor-pointer"
                      dangerouslySetInnerHTML={{ __html: option.label || "" }}
                    />
                  </div>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    ),

    select: (item) => (
      <div key={item.value} className="flex flex-col gap-2">
        <label className="font-poppins font-medium text-[16px] text-[#334155]">
          {item.label}
        </label>
        <Select
          value={currentFilters[item.value]?.[0] || ""}
          onValueChange={(val) =>
            handleFilterChange({
              key: item.value,
              value: val,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {item.items?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),

    date: (item) => (
      <div key={item.value} className="flex flex-col gap-2">
        <label className="font-poppins font-medium text-[16px] text-[#334155]">
          {item.label}
        </label>
        <Input
          type="date"
          className="w-full"
          value={currentFilters[item.value]?.[0] || ""}
          onChange={(e) =>
            handleFilterChange({
              key: item.value,
              value: e.target.value,
            })
          }
        />
      </div>
    ),

    checkbox: () => null,
    daterange: (item) => {
      const startSettings: DateRangeFilterProps = item.items?.[0] ?? {};
      const endSettings: DateRangeFilterProps = item.items?.[1] ?? {};

      if (!(startSettings?.value && endSettings?.value)) return null;

      const start = currentFilters[startSettings.value]?.[0] || "";
      const end = currentFilters[endSettings.value]?.[0] || "";

      return (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="overflow-visible"
        >
          <AccordionTrigger hasResponse className="font-poppins font-medium text-[18px] text-[#334155] leading-[27px] tracking-[0]">
            {item.label}
          </AccordionTrigger>
          <AccordionContent className="text-[#616E85] font-poppins text-[16px] overflow-visible font-normal leading-normal capitalize flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 pl-8 items-center">
                <span className="text-sm w-[24px]">{startSettings.label}</span>
                <Datepicker
                  i18n="pt"
                  asSingle
                  popoverDirection="down"
                  containerClassName={
                    "overflow-visible relative border rounded-lg"
                  }
                  placeholder={"Data de Início"}
                  useRange={false}
                  value={{
                    startDate: start ? normalizeDate(new Date(start)) : null,
                    endDate: start ? normalizeDate(new Date(start)) : null,
                  }}
                  onChange={(v) => {
                    const newStart = v?.startDate ?? null;
                    handleFilterChange({
                      key: startSettings.value ?? "",
                      value: formatDateToString(newStart),
                    });
                  }}
                />
              </div>
              <div className="flex gap-2 pl-8 items-center">
                <span className="text-sm w-[24px]">{endSettings.label}</span>
                <Datepicker
                  i18n="pt"
                  asSingle
                  popoverDirection="down"
                  containerClassName={
                    "overflow-visible relative border rounded-lg"
                  }
                  placeholder={"Data de Fim"}
                  useRange={false}
                  value={{
                    startDate: end ? normalizeDate(new Date(end)) : null,
                    endDate: end ? normalizeDate(new Date(end)) : null,
                  }}
                  onChange={(v) => {
                    const newEnd = v?.endDate ?? null;
                    handleFilterChange({
                      key: endSettings.value ?? "",
                      value: formatDateToString(newEnd),
                    });
                  }}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    },
  };

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isMobile]);

  if (isMobile) {
    return (
        <div id="filter-section">
          {isMobile && (
              <div
                  className="fixed inset-0 z-50 bg-white flex flex-col"
                  style={{ height: '100dvh', overflowY: 'auto' }}
              >
                <div className="flex flex-col px-10 pt-9">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-black text-[16px] font-normal">
                      FILTROS
                    </h1>
                    <button
                        onClick={onCloseMobile}
                        className="text-gray-800 text-lg font-bold"
                    >
                      <X />
                    </button>
                  </div>

                  <Accordion
                      type="multiple"
                      className="flex flex-col justify-center gap-2"
                  >
                    {data.map((item) => {
                      const safeType = item.type ?? "nested";
                      return renderers[safeType]?.(item);
                    })}
                  </Accordion>

                  {hasAnyFilter && (
                      <Button
                          size="sm"
                          onClick={clearFilters}
                          className="mt-6 w-full mb-14"
                      >
                        Limpar Filtros
                      </Button>
                  )}
                </div>
              </div>
          )}
        </div>
    );
  }

  return (
    <div id="filter-section">
      {/* <div className="absolute md:hidden flex justify-center items-center right-[30px] top-[450px] border border-[#BFC4CD] rounded-full p-2 w-12 h-12">
                <button onClick={handleOpenFilter}
                        className="flex text-[#616E85] justify-center items-center px-2">
                    <ListFilter size={30}/>
                </button>
            </div>*/}

      <div className="hidden lg:block">
        <div className="md:w-[200px] lg:w-[280px] h-auto">
          <Accordion type="multiple">
            {data.map((item) => {
              const safeType = item.type ?? "nested";
              return renderers[safeType]?.(item);
            })}
          </Accordion>
          {hasAnyFilter && (
            <Button
              size="sm"
              onClick={clearFilters}
              className="mt-8 w-full mb-14"
            >
              Limpar Filtros
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function normalizeDate(date: Date): Date {
  const normalizedDate = new Date(date);
  normalizedDate.setDate(normalizedDate.getDate() + 1);
  return normalizedDate;
}

function formatDateToString(date: Date | null): string {
  return date ? date.toISOString().split("T")[0] : ""; // Extract "yyyy-MM-dd"
}
