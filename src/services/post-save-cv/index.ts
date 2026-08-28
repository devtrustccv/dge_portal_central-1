export const saveCV = async (data: any) => {

    try {
        const response = await fetch("/api/save-cv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json().catch(() => {
            console.error("saveCV: erro ao parsear JSON.");
            return null;
        });


        if (!response.ok) {
            throw new Error(responseData?.error || "Erro ao salvar CV (HTTP " + response.status + ")");
        }

        return responseData;

    } catch (err) {
        console.error("saveCV: erro ao salvar curriculo.");
        throw err;
    }
};

export const updateCV = async (data: any) => {

    try {
        const response = await fetch("/api/update-cv", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json().catch(() => {
            console.error("updateCV: erro ao parsear JSON.");
            return null;
        });


        if (!response.ok) {
            throw new Error(responseData?.error || "Erro ao atualizar CV (HTTP " + response.status + ")");
        }

        return responseData;

    } catch (err) {
        console.error("updateCV: erro ao atualizar curriculo.");
        throw err;
    }
};
