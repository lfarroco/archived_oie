import { TaxonomyMap, ItemFieldsCollection } from "./TaxonomyItem"

export class Item {
    [index: string]: any;
    key: string;
    slug: string;
    name: string;
    namePlural: string;
    fields: ItemFieldsCollection;
    filters?: any;
    items: TaxonomyMap;
    constructor() {

        let dateTime = new Date().getTime();

        this.key = dateTime + '_k';

    }
}