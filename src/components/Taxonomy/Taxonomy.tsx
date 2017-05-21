import { ItemCollection, ItemFieldsCollection } from "./TaxonomyItem"

export class Item {
    key: string;
    slug: string;
    name: string;
    namePlural: string;
    fields: ItemFieldsCollection;
    filters?: any;
    constructor() {

        let dateTime = new Date().getTime();

        this.key = dateTime + '_k';

    }
}