import { Item } from "../Taxonomy/Taxonomy";

export default function deleteItem(item: Item, taxonomy: Item) {
    console.log('deleteItem item:', item, taxonomy.key)
}