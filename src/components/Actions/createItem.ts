import { Item } from "../Taxonomy/Taxonomy";

export default function createItem(item: Item, taxonomy: Item) {
    console.log('createItem item:', item, taxonomy.key)
}