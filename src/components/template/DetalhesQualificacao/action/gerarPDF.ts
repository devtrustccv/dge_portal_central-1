/*
import {jsPDF} from "jspdf";
import {autoTable} from "jspdf-autotable";

export function gerarPDF(formacaoTitle: any, data: any, tipo: "formacao" | "certificacao") {
    const doc = new jsPDF();

    const titulo = tipo === "formacao" ? "Programa Formativa" : "Unidades de Competências";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor("#000");

    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(titulo);
    const x = (pageWidth - textWidth) / 2;

    doc.text(titulo, x, 20); // Título no topo da página e centralizado


    const duracaoOuCodigo = tipo === "formacao" ? formacaoTitle.duracao : formacaoTitle.codigo;

    // Adiciona a tabela
    const tableColumns = [
        {header: "Denominação", dataKey: "denominacao"},
        {header: duracaoOuCodigo, dataKey: "label"}
    ];

    const tableData = data?.flatMap((item: any) => {
        return (tipo === "formacao" ? item?.formacao : item?.certificado)?.map((value: any) => ({
            denominacao: value?.denominacao,
            label: value?.label
        }));
    }) || [];

    // Desenhando a tabela usando autoTable
    autoTable(doc, {
        startY: 40,
        head: [tableColumns.map(col => col.header)], // Cabeçalhos
        body: tableData.map((row: any) => [row.denominacao, row.label]),
        theme: "striped",
        styles: {
            font: "helvetica",
            fontSize: 11,
            cellPadding: 6,
            textColor: "#616E85",
            lineColor: "#E2E8F0",
            lineWidth: 0.2,
            valign: "middle",
        },
        headStyles: {
            fillColor: "#0454A0",
            textColor: "#ffffff",
            fontStyle: "bold",
            fontSize: 12,
            halign: "left",
        },
        bodyStyles: {
            fillColor: "#ffffff",
            textColor: "#616E85",
            halign: "left",
        },
        alternateRowStyles: {
            fillColor: "#F8FAFC",
        },
        columnStyles: {
            0: {cellWidth: 120, halign: "left"},
            1: {cellWidth: 50, halign: "right"},
        },
    });

    doc.save(`${titulo}.pdf`);
}
*/
