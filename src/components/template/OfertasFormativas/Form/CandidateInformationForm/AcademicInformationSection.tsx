"use client";

import { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/atoms/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { Plus, Trash, Check, X, Upload, Pencil } from "lucide-react";
import { toast } from "sonner";
import { getDomainLabel } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { OptionsProps } from "../type";

interface Academic {
  anoEscolar: string;
  areaEstudo: string;
  media: number;
  file: File | null;
}

interface AcademicInformationSectionProps extends OptionsProps { }

export function AcademicInformationSection({
  area_studo,
  grau_academico,
}: AcademicInformationSectionProps) {
  const { control, setValue, watch, register } = useFormContext();
  const formacoes: Academic[] = watch("formacoes") || [];
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [areaEstudoError, setAreaEstudoError] = useState(false);

  const novaFormacao: Academic = watch("novaFormacao") || {
    anoEscolar: "",
    areaEstudo: "",
    media: 10,
    file: null,
  };

  const novaFile = watch("novaFormacao.file");
  const isNewRow = editing && editIndex === null;

  useEffect(() => {
    if (formacoes.length === 0 && !editing) {
      setEditing(true);
      setValue("novaFormacao", {
        anoEscolar: "",
        areaEstudo: "",
        media: 10,
        file: null,
      });
    }
  }, []);

  const handleAddClick = () => {
    setEditing(true);
    setEditIndex(null);
    setValue("novaFormacao", {
      anoEscolar: "",
      areaEstudo: "",
      media: 10,
      file: null,
    });
  };

  const handleEditClick = (index: number) => {
    const formacao = formacoes[index];
    setValue("novaFormacao", formacao);
    setEditIndex(index);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditIndex(null);
    setAreaEstudoError(false);
    setValue("novaFormacao", {
      anoEscolar: "",
      areaEstudo: "",
      media: 10,
      file: null,
    });
  };
  const anoEscolar = novaFormacao.anoEscolar;
  const is6to10 = ["5", "6", "7", "8", "9", "10"].includes(anoEscolar);
  const is11or12 = ["11", "12"].includes(anoEscolar);
  const hasEducationalArea = anoEscolar === '0';
  const handleSave = () => {
    if (!novaFormacao.anoEscolar) return;
    if (
      novaFormacao.media === undefined ||
      novaFormacao.media === null ||
      isNaN(Number(novaFormacao.media)) ||
      Number(novaFormacao.media) < 10 ||
      Number(novaFormacao.media) > 20
    ) {
      toast.error("A média deve estar entre 10 e 20.", {
        style: { background: "#FEE2E2", color: "#DC2626" },
      });
      return;
    }

    const requiresAreaEstudo = !["5", "6", "7", "8", "9", "10"].includes(
      novaFormacao.anoEscolar
    );
    if (!hasEducationalArea) {
      if (requiresAreaEstudo && (!novaFormacao.areaEstudo)) {
        setAreaEstudoError(true);
        toast.error("Área de Estudo é obrigatória para o ano selecionado", {
          style: { background: "#FEE2E2", color: "#DC2626" },
        });
        return;
      } else {
        setAreaEstudoError(false);
      }

      if (!novaFormacao.file) {
        toast.error("É necessário adicionar um ficheiro de comprovativo", {
          style: { background: "#FEE2E2", color: "#DC2626" },
        });
        return;
      }
    }
    const novaLista = [...formacoes];

    const novaEntrada = {
      ...novaFormacao,
      areaEstudo: requiresAreaEstudo ? novaFormacao.areaEstudo : "Não se aplica",
    };

    if (editIndex !== null) {
      novaLista[editIndex] = novaEntrada;
    } else {
      novaLista.push(novaEntrada);
    }

    setValue("formacoes", novaLista);
    setEditing(false);
    setEditIndex(null);
    setValue("novaFormacao", {
      anoEscolar: "",
      areaEstudo: "",
      media: 10,
      file: null,
    });
  };

  const removerFormacao = (index: number) => {
    const novaLista = formacoes.filter((_, i) => i !== index);
    setValue("formacoes", novaLista);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const maxSizeInBytes = 6 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        toast.error("O ficheiro deve ter no máximo 6MB.", {
          style: { background: "#FEE2E2", color: "#DC2626" },
        });
        return;
      }
    }
    setValue("novaFormacao.file", file);
  };

  const renderFormRow = () => (
    <motion.tr
      key={editIndex ?? "form-row"}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <TableCell>
        <Controller
          name="novaFormacao.anoEscolar"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={(value) => {
              field.onChange(value);
              setValue("novaFormacao.areaEstudo", "");
              setValue("novaFormacao.media", 10);
              setValue("novaFormacao.file", null);
            }}>
              <SelectTrigger className="min-w-[200px]">
                <SelectValue placeholder="Ano Escolar" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {grau_academico?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </TableCell>

      <TableCell>
        {is6to10 ? (
          <p className="text-sm text-gray-500 italic">Não se aplica</p>
        ) : is11or12 ? (
          <Controller
            name="novaFormacao.areaEstudo"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={hasEducationalArea || !anoEscolar}
              >
                <SelectTrigger
                  className={`min-w-[200px] ${areaEstudoError ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Área de Estudo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {area_studo?.map((item) => (
                      <SelectItem key={item.value + "*-/++"} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        ) : (
          <Input
            placeholder="Área de Estudo"
            {...register("novaFormacao.areaEstudo")}
            disabled={hasEducationalArea || !anoEscolar}
            className={`min-w-[200px] ${areaEstudoError ? "border-red-500" : ""}`}
          />
        )}
      </TableCell>

      <TableCell>
        <Input
          disabled={hasEducationalArea}
          type="number"
          min={10}
          max={20}
          {...register("novaFormacao.media", {
            valueAsNumber: true,
            min: 10,
            max: 20,
            onChange: (e) => {
              let value = e.target.value;
              value = value.replace(/[^\d.]/g, "");
              const numericValue = parseFloat(value);
              if (isNaN(numericValue)) {
                e.target.value = "";
              } else {
                e.target.value = numericValue.toString();
              }
            },

          })}
          onKeyDown={(e) => {
            if (["+", "-", "e", "E"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          className="min-w-[100px]"
        />


      </TableCell>

      <TableCell>
        <label
          className={`flex items-center gap-2 ${hasEducationalArea
            ? "opacity-50 pointer-events-none"
            : "cursor-pointer"
            } border border-gray-300 px-3 py-2 rounded`}
          title="Carregue um ficheiro em formato PDF, PNG ou JPG"
        >
          <Upload className="w-4 h-4 text-primary" />
          <span className="text-sm truncate max-w-[150px]">
            {novaFile?.name || "Carregar (PDF, PNG ou JPG)"}
          </span>
          <Input
            type="file"
            accept=".pdf,.png,.jpg"
            onChange={handleFileChange}
            className="hidden"
            disabled={hasEducationalArea}
          />
        </label>
      </TableCell>

      <TableCell className="flex justify-end gap-2">
        <Button type="button" onClick={handleSave} size="icon" className="bg-green-500 text-white">
          <Check />
        </Button>
        <Button type="button" onClick={handleCancel} size="icon" className="bg-gray-300">
          <X />
        </Button>
      </TableCell>
    </motion.tr>
  );

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ano Escolar</TableHead>
            <TableHead>Área de Estudo</TableHead>
            <TableHead>Média</TableHead>
            <TableHead>
              Certificado</TableHead>
            <TableHead className="flex justify-end">
              {(
                <Button
                  type="button"
                  onClick={handleAddClick}
                  disabled={editing}
                  size="sm"
                  className="w-[50px] h-[34px] rounded-[5px]"

                >
                  <Plus />
                </Button>
              )}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <AnimatePresence>
            {formacoes.map((item, index) => (
              editing && editIndex === index ? (
                renderFormRow()
              ) : (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TableCell>{getDomainLabel(grau_academico, item.anoEscolar)}</TableCell>
                  <TableCell>{is11or12 ? getDomainLabel(area_studo, item.areaEstudo) : item.areaEstudo || "-"}</TableCell>
                  <TableCell>{item.media || "-"}</TableCell>
                  <TableCell>{item.file?.name || "-"}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditClick(index)}
                      className="p-2 text-[#61C3A8] hover:bg-[#61C3A8]/10 rounded-lg"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removerFormacao(index)}
                      className="p-2 text-[#61C3A8] hover:bg-[#61C3A8]/10 rounded-lg"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </TableCell>
                </motion.tr>
              )
            ))}

            {isNewRow && renderFormRow()}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}