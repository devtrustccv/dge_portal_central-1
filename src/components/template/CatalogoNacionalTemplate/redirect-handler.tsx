"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RedirectHandler() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const flagCatalogo = searchParams.get("flag_catalogo");

        if (flagCatalogo !== "true") return;

        const currentParams = new URLSearchParams(searchParams.toString());

        // Garante que flag_catalogo seja sempre "true"
        currentParams.set("flag_catalogo", "true");

        const newUrl = `/formacoesCatalogo/catalogo?${currentParams.toString()}`;

        // Evita redirecionamento desnecessário se a URL já for a correta
        if (window.location.pathname + window.location.search !== newUrl) {
            router.replace(newUrl);
        }
    }, [searchParams, router]); // Apenas reexecuta quando os parâmetros mudam

    return null;
}
