export const logDownloadCV = (data: any) => {

    fetch("/api/logDownloadCV", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).catch(() => {
    })
}