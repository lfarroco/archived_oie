export const routes: RouteParams[] = [

]
export interface RouteParams {
    taxonomy: string;
    page: string;
    key?: string;
}

export function parseRoute(str?: string) {

    if (!str)
        str = location.hash.replace("#", "");

    let arr = str.split("/");

    let route: RouteParams = {
        taxonomy: arr[0],
        page: arr[1],
        key: arr[2]
    }

    return route;

}