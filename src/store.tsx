import { TAXONOMIES, TaxonomyMap } from "./constants"
import * as update from "immutability-helper"
import { Item } from "./components/Taxonomy/Taxonomy";
import { createStore } from 'redux'
import { RouteParams, parseRoute } from "./components/Routes/index";
import { ItemCollection } from "./components/Taxonomy/TaxonomyItem";

interface AppData {
    route: RouteParams;
    taxonomies: ItemCollection;
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
    taxonomies: TAXONOMIES
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

const reducer = (state = appData, action: ReducerActions) => {
    console.log(action);
    console.log('state was', state)
    switch (action.type) {
        case "VIEW_ALL":
            return {
                taxonomies: TAXONOMIES,
                route: {
                    page: "list",
                    taxonomy: action.taxonomyKey
                }
            };
        case "VIEW_SINGLE":
            return {
                taxonomies: TAXONOMIES,
                route: {
                    page: "view",
                    taxonomy: action.taxonomyKey,
                    key: action.itemKey
                }
            };
        case "UPDATE_ITEM":
            return update(state.taxonomies[action.taxonomyKey], { $merge: { [action.item.key]: action.item } });
        case "CREATE_ITEM":

            console.log('action is', action)

            let taxonomy = state.taxonomies[action.taxonomy.slug];

            let updateTax = update(taxonomy, { items: { $merge: { [action.item.key]: action.item } } })

            let taxonomies = update(state.taxonomies, { $merge: { [updateTax.slug]: updateTax } })

            localStorage.setItem(action.taxonomy.key, JSON.stringify(updateTax))

            let nextPage = action.nextPage || state.route.page;

            console.log('route with prev target:', state.route)

            let route = update(state.route, { $merge: { page: nextPage } })

            console.log('route with next target:', route)

            return {
                taxonomies: taxonomies,
                route: route
            };

        case "CHANGE_ROUTE":
            return {
                taxonomies: state.taxonomies,
                route: action.route
            };

        default:
            return state;
    }
}

export const oieStore = createStore(reducer);
