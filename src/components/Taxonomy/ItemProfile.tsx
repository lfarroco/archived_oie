import * as React from "react";
import { GenericForm } from "../GenericForm/index";
import { ItemFieldsCollection } from "./TaxonomyItem";
import { ItemFields } from "./ItemFields";
import { Item } from "./Taxonomy";

interface ItemProfileProps {
    data: Item;
    taxonomy: Item;
    onSubmit: Function;
}

export class ItemProfile extends React.Component<ItemProfileProps, undefined> {

    render() {

        console.log('rendering profile...')


        return <GenericForm
            data={this.props.data}
            taxonomy={this.props.taxonomy}
            onSubmit={(item: any) => { this.props.onSubmit(item) }} />


    }

    componentDidMount() {

        // fetch.(`http://www.reddit.com/r/${this.props.subreddit}.json`)
        // .then(res => {
        //     const posts = res.data.data.children.map(obj => obj.data);
        //     this.setState({ posts });
        // });


    }


}