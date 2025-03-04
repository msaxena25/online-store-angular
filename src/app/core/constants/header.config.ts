// src/app/config/header-config.ts

import { RouteUrls } from "./route.urls.constants";

export interface IHeaderConfig {
    showHeader: boolean;
    showLogo: boolean;
    showSearchbar: boolean;
    showCategories: boolean;
    showUser: boolean;
    showBag: boolean;
}

const commonProps: IHeaderConfig = {
    showHeader: true,
    showLogo: true,
    showCategories: true,
    showSearchbar: true,
    showUser: true,
    showBag: true,
};

export const HEADER_CONFIG: { [key: string]: IHeaderConfig } = {
    '*': { ...commonProps },
    [RouteUrls.route.checkout]: {
        showHeader: true,
        showLogo: true,
        showCategories: false,
        showUser: false,
        showSearchbar: true,
        showBag: false,
    },
};
