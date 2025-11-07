import { IMenuData, IMenuGroup, IMenu, ISubMenu } from "../type";

export function mapper(response: any): IMenuData {
  if (!response || !Array.isArray(response.menus)) {
    return { menuGroups: [] };
  }

  const menuGroups: IMenuGroup[] = response?.menus?.map((item: any) => {

    const menuGroup: IMenuGroup = {
      name: item.label ?? "",
    };

    if (item.url) {
      menuGroup.url = item.url;
    }

    if (Array.isArray(item.submenu)) {
      menuGroup.menus = item.submenu?.map((sub: any) => {

        const menu: IMenu = {
          name: sub.title ?? "",
          submenus: Array.isArray(sub.submenu)
            ? sub.submenu.map((sub2: any) => {
              const subMenu: ISubMenu = {
                name: sub2.label ?? "",
                url: sub2.url ?? "",
              };
              return subMenu;
            })
            : [],
        };
        return menu;
      });
    }

    return menuGroup;
  });

  return { menuGroups };
}
