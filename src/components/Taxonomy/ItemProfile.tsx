import * as React from "react";
import { GenericForm } from "../GenericForm/index";
import { ItemFieldsCollection } from "./TaxonomyItem";
import { ItemFields } from "./ItemFields";
import { Item } from "./Taxonomy";

interface ItemProfileProps {
    item: Item;
    taxonomy: Item;
    fields: ItemFieldsCollection;
    onChange: Function;
    onSubmit: Function;
}

export class ItemProfile extends React.Component<ItemProfileProps, undefined> {

    render() {

        console.log('item being viewed', this.props.item)

        return <GenericForm
            item={this.props.item}
            title={this.props.taxonomy.name}
            fields={this.props.fields}
            onSubmit={(item: any) => { this.props.onSubmit(item) }} />


    }

}