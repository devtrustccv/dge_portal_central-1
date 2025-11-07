"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/atoms/alert-dialog";
import { useState } from "react";
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader-es6"), { ssr: false });

export default function CameraModal({
    open,
    setOpen,
    setCodigo
}:{
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCodigo: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
    const [result, setResult] = useState<string>("Nenhum código lido ainda");

    setCodigo(result);

    const handleError = (err: unknown) => {
        console.error(err);
    };

    const handleScan = (data: string | null) => {
        if (data) {
            setResult(data);
            setOpen(false);

            // Se for link válido, redireciona
            if (/^https?:\/\//i.test(data)) {
                window.location.href = data;
            }
        }
    };
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="max-w-md bg-transparent">
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-white'>Escaneie o QR Code</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="w-full h-96 rounded-lg overflow-hidden bg-transparent">
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{width: "100%", height: "100%"}}
                    />
                </div>
                <p className="text-lg break-all text-center text-white">
                    <span className="font-semibold">Resultado:</span> {result}
                </p>
                <AlertDialogFooter>
                    <button
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Fechar
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
