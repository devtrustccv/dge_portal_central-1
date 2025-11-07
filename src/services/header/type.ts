export interface ISubMenu {
    name: string;
    url: string;
}

export interface IMenu {
    name: string;
    submenus: ISubMenu[];
}

export interface IMenuGroup {
    name: string;
    url?: string;
    menus?: IMenu[];
}

export interface IMenuData {
    menuGroups: IMenuGroup[];
}
