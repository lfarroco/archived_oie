import * as React from "react";
import { GenericForm } from "../GenericForm/index";
import { ItemFieldsCollection } from "./TaxonomyItem";
import { ItemFields } from "./ItemFields";
import { Item } from "./Taxonomy";

interface ItemProfileProps {
    item: Item;
    taxonomy: Item;
    onSubmit: Function;
}

export class ItemProfile extends React.Component<ItemProfileProps, undefined> {

    render() {



        return <GenericForm
            item={this.props.item}
            taxonomy={this.props.taxonomy}
            onSubmit={(item: any) => { this.props.onSubmit(item) }} />


    }

}