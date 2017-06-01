import { OIE_TAXONOMY } from "./constants"
import * as update from "immutability-helper"
import { Item } from "./components/Taxonomy/Taxonomy";
import { createStore } from 'redux'
import { RouteParams, parseRoute } from "./components/Routes/index";

interface AppData {
    route: RouteParams;
    taxonomy: Item;
}

let startingRoute = parseRoute();
if (!startingRoute.taxonomy) {
    startingRoute = {
        page: "list",
        taxonomy: "clients",
        key: startingRoute.key
    }
}

export const appData: AppData = {
    route: startingRoute,
    taxonomy: OIE_TAXONOMY
}

export interface ReducerActions {
    type: "VIEW_ALL" | "VIEW_SINGLE" | "CREATE_ITEM" | "UPDATE_ITEM" | "CHANGE_ROUTE";
    taxonomy?: Item;
    taxonomyKey?: string;
    itemKey?: string;
    item?: Item;
    route?: RouteParams;
    nextPage?: string;
}

const reducer = (state = appData, action: ReducerActions): AppData => {
    console.log(action);
    console.log('state was', state)
    switch (action.type) {
        case "VIEW_ALL":
            return {
                taxonomy: state.taxonomy,
                route: update(state.route, {
                    $merge: {
                        page: "list",
                        taxonomy: action.taxonomyKey
                    }
                })


            };
        case "VIEW_SINGLE":
            return {
                taxonomy: OIE_TAXONOMY,
                route: update(state.route, {
                    $merge: {
                        page: "view",
                        taxonomy: action.taxonomyKey,
                        key: action.itemKey
                    }
                })

            };
        case "UPDATE_ITEM":
            return update(state.taxonomy.items[action.taxonomyKey], { $merge: { [action.item.key]: action.item } });
        case "CREATE_ITEM":

            console.log('action is', action)

            let taxonomy: Item = state.taxonomy.items[action.taxonomy.slug];

            //update taxonomy
            let updateTax: Item = update(taxonomy, { items: { $merge: { [action.item.key]: action.item } } })

            //merge updated taxonomy into the map
            let taxonomies = update(state.taxonomy.items, { $merge: { [updateTax.slug]: updateTax } })

            //merge taxonomy

            let oie_taxonomy = update(state.taxonomy, { $merge: { items: taxonomies } })

            localStorage.setItem(action.taxonomy.key, JSON.stringify(updateTax))

            let nextPage = action.nextPage || state.route.page;

            let route = update(state.route, { $merge: { page: nextPage } })
            console.log('>>>', route)

            return {
                taxonomy: oie_taxonomy,
                route: route
            };

        case "CHANGE_ROUTE":
            return {
                taxonomy: state.taxonomy,
                route: action.route
            };

        default:
            return state;
    }
}

export const oieStore = createStore(reducer);
