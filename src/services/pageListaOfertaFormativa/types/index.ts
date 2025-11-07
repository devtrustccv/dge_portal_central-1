interface IHeaderImage {
    formats: {
        large: IImageFormat;
        small: IImageFormat;
        medium: IImageFormat;
        thumbnail: IImageFormat;
    };
}

interface IImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
}

interface IConfigItem {
    label: string;
    value: string;
}

interface IConfigGroup {
    items: IConfigItem[];
    label: string;
    value: string;
}

export interface IConfig {
    items: IConfigItem[] | IConfigGroup[];
    label: string;
    value: string;
}

export interface IPageInfo {
    id: string;
    title: string;
    subtitle: string;
    headerImage: IHeaderImage;
    configs: IConfig[];
}

export interface IListaOfertaFormativa {
    listaOfertaFormativa: {
        PageInfo: IPageInfo;
    };
}
