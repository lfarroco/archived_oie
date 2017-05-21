import { ItemFields } from "./ItemFields";
import { Item } from "./Taxonomy";

export interface ItemCollection {
    [key: string]: Item;
}

export interface ItemFieldsCollection {
    [key: string]: ItemFields;
}