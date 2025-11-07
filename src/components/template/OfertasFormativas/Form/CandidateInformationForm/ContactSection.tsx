"use client";

import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/atoms/table";
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/atoms/select";
import { Plus, Trash, Check, X, Pencil } from "lucide-react";
import { toast } from "sonner";
import { getDomainLabel } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { OptionsProps } from "../type";

interface Contact {
    tipoContato: string;
    contato: string;
    pertenceAoD: string;
}

interface ContactSectionProps extends OptionsProps { }

export function ContactSection({ tipo_contato, proprietario_cont }: ContactSectionProps) {
    const { control, setValue, watch } = useFormContext();
    const contatos: Contact[] = watch("contatos") || [];
    const [editing, setEditing] = useState<boolean>(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const novoContato = watch("novoContato") ?? {
        tipoContato: "",
        contato: "",
        pertenceAoD: "",
    };

    useEffect(() => {
        const temTelefone = contatos.some((c) => ["TELEFONE", "N_MOVEL"].includes(c.tipoContato));

        if (!temTelefone && !editing) {
            setValue("novoContato", {
                tipoContato: "N_MOVEL",
                contato: "",
                pertenceAoD: "",
            });
            setEditing(true);
        }
    }, [contatos, editing, setValue]);

    const handleAddClick = () => {
        setValue("novoContato", {
            tipoContato: "N_MOVEL",
            contato: "",
            pertenceAoD: "",
        });
        setEditIndex(null);
        setEditing(true);
    };

    const handleEditClick = (index: number) => {
        const contato = contatos[index];
        setValue("novoContato", contato);
        setEditIndex(index);
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
        setEditIndex(null);
        setValue("novoContato", {
            tipoContato: "",
            contato: "",
            pertenceAoD: "",
        });
    };

    const handleSave = () => {
        const { tipoContato, contato, pertenceAoD } = novoContato;

        if (!tipoContato || !contato || !pertenceAoD) {
            toast.error("Preencha todos os campos obrigatórios.", {
                style: { background: "#FEE2E2", color: "#DC2626" },
            });
            return;
        }

        if (tipoContato === "EMAIL") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contato)) {
                toast.error("Email inválido.", {
                    style: { background: "#FEE2E2", color: "#DC2626" },
                });
                return;
            }
        }

        if (["TELEFONE", "N_MOVEL"].includes(tipoContato)) {
            if (!/^\d{7}$/.test(contato)) {
                toast.error("O número deve ter exatamente 7 dígitos.", {
                    style: { background: "#FEE2E2", color: "#DC2626" },
                });
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
        setEditing(false);
        setEditIndex(null);
    };

    const removerContato = (index: number) => {
        const novaLista = contatos.filter((_, i) => i !== index);
        setValue("contatos", novaLista);
    };

    const isNewRow = editing && editIndex === null;

    return (
        <div className="space-y-6">
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Tipo de Contato</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Pertence a</TableHead>
                        <TableHead className="flex justify-end">
                            {(
                                <Button
                                    type="button"
                                    onClick={handleAddClick}
                                    size="sm"
                                    className="w-[50px] h-[34px] rounded-[5px]"
                                    disabled={editing}
                                >
                                    <Plus />
                                </Button>

                            )}
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <AnimatePresence>
                        {contatos.map((contato, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                {editing && editIndex === index ? (
                                    <>
                                        <TableCell>
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
                                        </TableCell>
                                        <TableCell>
                                            <Controller
                                                name="novoContato.contato"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        className="min-w-[200px]"
                                                        type={novoContato.tipoContato === "EMAIL" ? "email" : "text"}
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>
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
                                        </TableCell>
                                        <TableCell className="flex justify-end gap-2">
                                            <Button type="button" onClick={handleSave} size="icon" className="bg-green-600 text-white">
                                                <Check className="w-5 h-5" />
                                            </Button>
                                            <Button type="button" onClick={handleCancel} size="icon" className="bg-gray-300">
                                                <X className="w-5 h-5" />
                                            </Button>
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>{getDomainLabel(tipo_contato, contato.tipoContato)}</TableCell>
                                        <TableCell>{contato.contato}</TableCell>
                                        <TableCell>{getDomainLabel(proprietario_cont, contato.pertenceAoD)}</TableCell>
                                        <TableCell className="flex justify-end gap-2">

                                            <button
                                                type="button" onClick={() => handleEditClick(index)}
                                                className="p-2 text-[#61C3A8] hover:bg-[#61C3A8]/10 rounded-lg"
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </button>

                                            <button
                                                type="button" onClick={() => removerContato(index)}
                                                className="p-2 text-[#61C3A8] hover:bg-[#61C3A8]/10 rounded-lg"
                                            >
                                                <Trash className="w-5 h-5" />
                                            </button>
                                        </TableCell>
                                    </>
                                )}
                            </motion.tr>
                        ))}

                        {isNewRow && (
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
                                </TableCell>
                                <TableCell>
                                    <Controller
                                        name="novoContato.contato"
                                        control={control}
                                        render={({ field }) => (
                                            <Input className="min-w-[200px]" type="email" {...field} />
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
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
                                </TableCell>
                                <TableCell className="flex justify-end gap-2">
                                    <Button type="button" onClick={handleSave} size="icon" className="bg-green-500 text-white">
                                        <Check className="w-5 h-5" />
                                    </Button>
                                    <Button type="button" onClick={handleCancel} size="icon" className="bg-gray-300">
                                        <X className="w-5 h-5" />
                                    </Button>
                                </TableCell>
                            </motion.tr>
                        )}
                    </AnimatePresence>
                </TableBody>
            </Table>
        </div>
    );
}
