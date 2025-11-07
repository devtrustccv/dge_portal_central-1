
export function mapper(response: any): any { // depois bh djobe quel tipo li maduu
    if (!response) return null;

    const data = response?.pageListaEntidade?.PageInfo;

    if (!data) return null;

    return {
        listaEntidadesFormadoras: {
            PageInfo: {
                id: data.id,
                title: data.title,
                subtitle: data.subtitle,
                description: data.description,
                headerImage: data.headerImage ? { formats: data.headerImage.formats } : { formats: {} }, // Garante que formats não seja undefined
                configs: Array.isArray(data.configs)
                    ? data.configs.map((item: any) => ({
                        items: item?.items || [],
                        label: item?.label || '',
                        value: item?.value || ''
                    }))
                    : []
            }
        }
    };
}
