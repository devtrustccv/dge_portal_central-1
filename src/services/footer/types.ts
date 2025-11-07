export interface IImageFormat {
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
export interface IImage {
    formats?: {
        small?: IImageFormat;
        medium?: IImageFormat;
        large?: IImageFormat;
        thumbnail?: IImageFormat;
    };
    url: string;
}

export interface ISocialMidia {
    logo: IImage;
    name: string;
    url : string;
}

export interface IContact{
    label : string;
    url: string;
    external_link: boolean ;
}

export interface ISiteMap{
    label : string;
    url: string;
    external_link: boolean;
}

export interface IUsefulLinks{
    label : string;
    url: string;
    external_link: boolean;
}

export interface IClient{
    name: string;
    url: string;
    logo: IImage;
}


export interface IFooter{
    logo: IImage;
    social_midia : ISocialMidia[];
    contact: IContact[];
    site_map_title: string;
    site_map: ISiteMap[];
    useful_links_title: string;
    usefull_links: IUsefulLinks[];
    client : IClient[];
}

