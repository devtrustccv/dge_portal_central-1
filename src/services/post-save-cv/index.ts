export const saveCV = async (data: any) => {

    try {
        const response = await fetch("/api/save-cv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json().catch(err => {
            console.error("saveCV → erro ao parsear JSON:", err);
            return null;
        });


        if (!response.ok) {
            throw new Error(responseData?.error || "Erro ao salvar CV (HTTP " + response.status + ")");
        }

        return responseData;

    } catch (err) {
        console.error("saveCV → catch geral:", err);
        throw err;
    }
};