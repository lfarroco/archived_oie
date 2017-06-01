import * as React from "react";

import { Item } from "../Taxonomy/Taxonomy";
import { ItemList } from "../Taxonomy/ItemList";
import { RouteParams } from "../Routes/index";
import { TaxonomyMap } from "../Taxonomy/TaxonomyItem";
import { ItemProfile } from "../Taxonomy/ItemProfile";
import { actions } from "../Actions/index";
import { ComponentMap, ComponentOptions } from "../../constants";


export interface PageProps {
    taxonomy: Item;
    route: RouteParams;
    title: string;
    components: ComponentMap;
    data: any;
    onChangeRoute: Function;
    onAddItem: Function;
    onDeleteItem: Function;
    onUpdateItem: Function;
}

export class Page extends React.Component<PageProps, undefined> {

    render() {

        console.log('Page - this.props:', this.props)

        let components = Object.keys(this.props.components).map((key, index) => {

            let componentOptions = this.props.components[key];

            let component = this.mapComponent(componentOptions, index);

            return component;

        })

        return <div>

            <h2>{this.props.title}</h2>

            <div>
                {components}
            </div>

        </div>


    }

    mapComponent(componentOptions: ComponentOptions, index: number) {

        console.log('component key:', componentOptions)

        let onClick, onDelete, onSubmit;

        if (componentOptions.onClick == "view") {
            onClick = (item: Item) => { this.viewItem(item, this.props.taxonomy.slug) }
        }

        if (componentOptions.onDelete == "delete") {
            onDelete = (item: Item) => { this.props.onDeleteItem(item) }
        }

        if (componentOptions.onSubmit == "update") {
            //onSubmit = actions.updateItem
            onSubmit = (item: Item) => { this.props.onUpdateItem(item) }
        }

        if (componentOptions.onSubmit == "add") {
            onSubmit = (item: Item) => { this.props.onAddItem(item) }
        }
        console.log('the key is', componentOptions.key)
        switch (componentOptions.key) {

            case "list":
                return <ItemList
                    key={index}
                    taxonomy={this.props.taxonomy}
                    onClick={onClick}
                    onDelete={onDelete}
                    items={this.props.data}
                    filter={componentOptions.filter}
                />
            case "view":
                return <ItemProfile
                    key={index}
                    data={this.props.data}
                    taxonomy={this.props.taxonomy}
                    onSubmit={onSubmit}
                />
            case "add":
                return <ItemProfile
                    key={index}
                    data={new Item()}
                    taxonomy={this.props.taxonomy}
                    onSubmit={onSubmit}
                />
            default:
                return <div key={index}>No component</div>;

        }

    }



    //ACTIONS

    viewItem(item: Item, taxonomyKey: string) {

        this.props.onChangeRoute({
            page: "view",
            taxonomy: taxonomyKey,
            key: item.key
        });

    }

}