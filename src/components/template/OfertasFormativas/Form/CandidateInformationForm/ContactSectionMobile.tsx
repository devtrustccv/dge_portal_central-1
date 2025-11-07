"use client";

import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Plus, Trash, Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";
import { getDomainLabel } from "@/lib/utils";
import { OptionsProps } from "../type";
import { Modal } from "@/components/atoms/modal";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select";

interface Contact {
    tipoContato: string;
    contato: string;
    pertenceAoD: string;
}

interface ContactSectionMobileProps extends OptionsProps { }

export function ContactSectionMobile({ tipo_contato, proprietario_cont }: ContactSectionMobileProps) {
    const { control, setValue, watch } = useFormContext();
    const contatos: Contact[] = watch("contatos") || [];
    const [modalOpen, setModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const novoContato = watch("novoContato") ?? {
        tipoContato: "",
        contato: "",
        pertenceAoD: "",
    };

    function openAddModal() {
        setValue("novoContato", {
            tipoContato: "",
            contato: "",
            pertenceAoD: "",
        });
        setEditIndex(null);
        setModalOpen(true);
    }

    function openEditModal(index: number) {
        setValue("novoContato", contatos[index]);
        setEditIndex(index);
        setModalOpen(true);
    }

    function handleCancel() {
        setModalOpen(false);
        setEditIndex(null);
        setValue("novoContato", {
            tipoContato: "",
            contato: "",
            pertenceAoD: "",
        });
    }

    function handleSave() {
        const { tipoContato, contato, pertenceAoD } = novoContato;

        if (!tipoContato || !contato || !pertenceAoD) {
            toast.error("Preencha todos os campos obrigatórios.");
            return;
        }

        if (tipoContato === "EMAIL") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contato)) {
                toast.error("Email inválido.");
                return;
            }
        }

        if (["TELEFONE", "N_MOVEL"].includes(tipoContato)) {
            if (!/^\d{7}$/.test(contato)) {
                toast.error("O número deve ter exatamente 7 dígitos.");
                return;
            }
        }

        const novo: Contact = { tipoContato, contato, pertenceAoD };
        const novaLista = [...contatos];
        if (editIndex !== null) {
            novaLista[editIndex] = novo;
        } else {
            novaLista.push(novo);
        }

        setValue("contatos", novaLista);
        setValue("novoContato", { tipoContato: "", contato: "", pertenceAoD: "" });
        setModalOpen(false);
        setEditIndex(null);
    }

    function removerContato(index: number) {
        const novaLista = contatos.filter((_, i) => i !== index);
        setValue("contatos", novaLista);
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg"></h2>
                <Button type="button" onClick={openAddModal} size="icon" className="rounded-full bg-primary text-white">
                    <Plus />
                </Button>
            </div>
            <div className="space-y-2">
                {contatos.length === 0 && <div className="text-gray-500 text-sm">Nenhum contacto adicionado ainda.</div>}
                {contatos?.map((contato, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-3 flex flex-col gap-1 border">
                        <div className="text-xs text-gray-500">{getDomainLabel(tipo_contato, contato.tipoContato)}</div>
                        <div className="font-semibold">{contato.contato}</div>
                        <div className="text-xs">{getDomainLabel(proprietario_cont, contato.pertenceAoD)}</div>
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
                                onClick={() => removerContato(index)}
                                className="p-2 text-[#61C3A8] hover:bg-[#61C3A8]/10 rounded-lg"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editIndex === null ? "Adicionar Contacto" : "Editar Contacto"} maxWidth="4xl">
                <div className="space-y-4 pt-2">
                    <Controller
                        name="novoContato.tipoContato"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="min-w-[200px]">
                                    <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {tipo_contato.map((item) => (
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
                        name="novoContato.contato"
                        control={control}
                        render={({ field }) => (
                            <Input
                                className="w-full"
                                placeholder="Contacto"
                                type={novoContato.tipoContato === "EMAIL" ? "email" : "text"}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="novoContato.pertenceAoD"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="min-w-[200px]">
                                    <SelectValue placeholder="Pertence a?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {proprietario_cont.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <div className="flex gap-2 justify-end pt-2">
                        <Button type="button" onClick={handleSave} size="icon" className="bg-green-500 text-white">
                            <Check className="w-5 h-5" />
                        </Button>
                        <Button type="button" onClick={handleCancel} size="icon" className="bg-gray-300">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
