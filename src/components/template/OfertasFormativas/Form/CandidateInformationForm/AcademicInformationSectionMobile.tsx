"use client";

import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/select";
import { Plus, Trash, Pencil, Check, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { getDomainLabel } from "@/lib/utils";
import { OptionsProps } from "../type";
import { Modal } from "@/components/atoms/modal";

interface Academic {
    anoEscolar: string;
    areaEstudo: string;
    media: number;
    file: File | null;
}

interface AcademicInformationSectionMobileProps extends OptionsProps { }

export function AcademicInformationSectionMobile({
    area_studo,
    grau_academico,
}: AcademicInformationSectionMobileProps) {
    const { control, setValue, watch, register } = useFormContext();
    const formacoes: Academic[] = watch("formacoes") || [];
    const [modalOpen, setModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [areaEstudoError, setAreaEstudoError] = useState(false);

    const novaFormacao: Academic = watch("novaFormacao") || {
        anoEscolar: "",
        areaEstudo: "",
        media: 10,
        file: null,
    };

    const novaFile = watch("novaFormacao.file");
    const anoEscolar = novaFormacao.anoEscolar;
    const is6to10 = ["5", "6", "7", "8", "9", "10"].includes(anoEscolar);
    const is11or12 = ["11", "12"].includes(anoEscolar);
    const hasEducationalArea = anoEscolar === "0";

    function openAddModal() {
        setValue("novaFormacao", {
            anoEscolar: "",
            areaEstudo: "",
            media: 10,
            file: null,
        });
        setEditIndex(null);
        setModalOpen(true);
    }

    function openEditModal(index: number) {
        setValue("novaFormacao", formacoes[index]);
        setEditIndex(index);
        setModalOpen(true);
    }

    function handleCancel() {
        setModalOpen(false);
        setEditIndex(null);
        setAreaEstudoError(false);
        setValue("novaFormacao", {
            anoEscolar: "",
            areaEstudo: "",
            media: 10,
            file: null,
        });
    }

    function handleSave() {
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
            if (requiresAreaEstudo && !novaFormacao.areaEstudo) {
                setAreaEstudoError(true);
                toast.error("Área de Estudo é obrigatória para o ano selecionado.", {
                    style: { background: "#FEE2E2", color: "#DC2626" },
                });
                return;
            } else {
                setAreaEstudoError(false);
            }
            if (!novaFormacao.file) {
                toast.error("É necessário adicionar um ficheiro de comprovativo.", {
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
        setModalOpen(false);
        setEditIndex(null);
        setValue("novaFormacao", {
            anoEscolar: "",
            areaEstudo: "",
            media: 10,
            file: null,
        });
    }

    function removerFormacao(index: number) {
        const novaLista = formacoes.filter((_, i) => i !== index);
        setValue("formacoes", novaLista);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
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
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg"></h2>
                <Button
                    type="button"
                    onClick={openAddModal}
                    size="icon"
                    className="rounded-full bg-primary text-white"
                >
                    <Plus />
                </Button>
            </div>
            <div className="space-y-2">
                {formacoes.length === 0 && (
                    <div className="text-gray-500 text-sm">
                        Nenhuma formação adicionada ainda.
                    </div>
                )}
                {formacoes.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow p-3 flex flex-col gap-1 border"
                    >
                        <div className="text-xs text-gray-500">
                            {getDomainLabel(grau_academico, item.anoEscolar)}
                        </div>
                        <div className="font-semibold">
                            {is11or12
                                ? getDomainLabel(area_studo, item.areaEstudo)
                                : item.areaEstudo}
                        </div>
                        <div className="text-xs">Média: {item.media}</div>
                        <div className="text-xs">Certificado: {item.file?.name || "-"}</div>
                        <div className="flex gap-2 mt-2 justify-end">
                            <button
                                type="button"
                                onClick={() => openEditModal(index)}
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
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={
                    editIndex === null
                        ? "Adicionar Formação Académica"
                        : "Editar Formação"
                }
                maxWidth="4xl"
            >
                <div className="space-y-4 pt-2">
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
                                <SelectTrigger className="">
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

                    <Controller
                        name="novaFormacao.areaEstudo"
                        control={control}
                        render={({ field }) =>
                            is6to10 ? (
                                <Input
                                    className="w-full"
                                    value="Não se aplica"
                                    disabled
                                    readOnly
                                />
                            ) : is11or12 ? (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={hasEducationalArea || !anoEscolar}
                                >
                                    <SelectTrigger
                                        className={` ${areaEstudoError ? "border-red-500" : ""}`}
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
                            ) : (
                                <Input
                                    placeholder="Área de Estudo"
                                    {...register("novaFormacao.areaEstudo")}
                                    disabled={hasEducationalArea || !anoEscolar}
                                    className={`min-w-[200px] ${areaEstudoError ? "border-red-500" : ""}`}
                                />
                            )
                        }
                    />

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
                    />

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
                    <div className="flex gap-2 justify-end pt-2">
                        <Button
                            type="button"
                            onClick={handleSave}
                            size="icon"
                            className="bg-green-500 text-white"
                        >
                            <Check className="w-5 h-5" />
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCancel}
                            size="icon"
                            className="bg-gray-300"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
