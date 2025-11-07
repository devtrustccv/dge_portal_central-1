"use client";

import { useFormContext } from "react-hook-form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/atoms/table";
import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";

export interface DocumentsFormProps {
  options: {
    DESCRICAO: string;
    OBRIGATORIEDADE: 'S' | 'N';
    VALOR: string;
  }[]
}
export function DocumentsForm({ options }: DocumentsFormProps) {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo de Documento</TableHead>
            <TableHead>Obrigatório</TableHead>
            <TableHead>Anexar Arquivo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { options?.map((doc, index) => (
            <TableRow key={index} className="border-b-gray-100">
              <TableCell>{doc.DESCRICAO}</TableCell>
              <TableCell>
                {doc.OBRIGATORIEDADE === "S" ? (
                  <span className="text-red-500 font-semibold">Sim</span>
                ) : (
                  "Não"
                )}
              </TableCell>
              <TableCell>
                <Label htmlFor={`document-${index}`} className="sr-only">
                  {doc.DESCRICAO}
                </Label>
                <Input
                  id={`document-${index}`}
                  type="file"
                  {...register(`documents.${index}.file`, { required: doc.OBRIGATORIEDADE === "S" })}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
