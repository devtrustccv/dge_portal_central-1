'use client'
import { useState, useEffect } from "react";
import { VerifyAuthenticity } from "@/components/organisms/VerifyAuthenticity/VerifyAuthenticity";
import { getverifyAuthenticity, IContraProva } from "@/services/verifyAuthenticity";

export function VerifyAuthenticityTemplate() {
    const [searchTerm, setSearchTerm] = useState('');
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [resultado, setResultado] = useState<IContraProva | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (window.location.search) {
            const params = new URLSearchParams(window.location.search);
            if (params.has('contraProva')) {
                params.delete('contraProva');
                const newUrl = `${window.location.pathname}?${params.toString()}`;
                window.history.replaceState(null, '', newUrl);
            }
        }
        setSearchTerm('');
        setResultado(null);
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);

        if (timeoutId) clearTimeout(timeoutId);

        const id = setTimeout(async () => {
            const params = new URLSearchParams(window.location.search);
            if (term) params.set('contraProva', term);
            else params.delete('contraProva');

            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.replaceState(null, '', newUrl);

            if (term) {
                setLoading(true);
                try {
                    const res: IContraProva = await getverifyAuthenticity({ contraProva: term });
                    setResultado(res);
                } catch (err) {
                    setResultado(null);
                    console.error('Erro ao buscar autenticidade', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setResultado(null);
            }
        }, 500);

        setTimeoutId(id);
    };

    return (
        <div>
            <VerifyAuthenticity
                value={searchTerm}
                onSearch={handleSearch}
                resultado={resultado}
                loading={loading}
            />
        </div>
    );
}
