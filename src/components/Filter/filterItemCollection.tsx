import { Item } from "../Taxonomy/Taxonomy";

export interface filterOptions {
    property: string;
    value: string;
    operator: FilterOperator;
}

export interface FilterOperator {
    name: "Menor que" | "Maior que" | "Igual a" | "Maior ou igual a" | "Menor ou igual a" | "Contém";
    symbol: ">" | "<" | "==" | "===" | ">=" | "<=" | "CONTAINS";
}

export interface FilterCollection {
    [name: string]: filterOptions;
}

let symbols = [">", "<", "===", ">=", "<=", "CONTAINS"];

/**
 * Function filter
 * Compares an item with a condition
 * Return true if conditions are met, else returns false
 * @param item 
 * @param filterOptions 
 */

export function filter(item: Item, filterOptions: filterOptions) {

    if (filterOptions.property === "ANY")
        return filterAnyProp(item, filterOptions);

    return filterByProp(item, filterOptions)

}

export function filterAnyProp(item: any, filterOptions: filterOptions): boolean {

    console.log('filtering any...');

    return Object.keys(item).some(propKey => {

        return filterByProp(item, {
            operator: filterOptions.operator,
            property: propKey,
            value: filterOptions.value
        })

    });
}

function filterByProp(item: any, filterOptions: filterOptions) {

    let val = item[filterOptions.property];
    if (!val) {
        console.log('not val!')
        return false;
    }
    let symbol = filterOptions.operator.symbol;
    let value = filterOptions.value;

    let targetValue = val.toLowerCase();

    if (symbol === "<" && targetValue < value)
        return true;
    else if (symbol === ">" && targetValue > value)
        return true;
    else if (symbol === "==" && targetValue === value)
        return true;
    else if (symbol === "===" && targetValue === value)
        return true;
    else if (symbol === ">=" && targetValue >= value)
        return true;
    else if (symbol === "<=" && targetValue <= value)
        return true;
    else if (symbol === "CONTAINS" && targetValue.indexOf(value) > -1) {
        return true;
    }
    else
        return false;

}