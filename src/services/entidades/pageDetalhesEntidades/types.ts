export interface IHeaderImage {
    formats: Record<string, any>;
    url: string;
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

interface IPageInfo {
    id: string;
    title: string;
    subtitle: string;
    subtitle2: string;
    description :string;
    headerImage: IHeaderImage;
    configs: IConfig[];
}
interface IsaibaMais{
    id: string,
    title: string,
    url: string,
    url_externo: string,
    button_label: string
}

export interface IDetalhesEntidades {
    listaDetalhesFormadoras: {
        PageInfo: IPageInfo;
        SaibaMais : IsaibaMais[];
    };
}