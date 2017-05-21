import { FilterCollection } from "../Filter/filterItemCollection";

export interface ItemFields {
    label: string;
    type?: "text" | "date" | "email" | "fieldEditor" | "itemPicker";
    cols?: string;
    taxonomy?: string;
    filters?: FilterCollection;
}
