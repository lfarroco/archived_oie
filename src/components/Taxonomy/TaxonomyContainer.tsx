import * as React from "react";

import { ItemCollection, ItemFieldsCollection } from "./TaxonomyItem"
import { ItemList } from "./ItemList"
import { ItemListDetails } from "./ItemListDetails"
import { ItemProfile } from "./ItemProfile";
import { ItemFields } from "./ItemFields";
import { RouteParams } from "../Routes";

import { TaxonomyToolbar } from "./TaxonomyToolbar"
import { Item } from "./Taxonomy";

import { filterOptions } from "../Filter/filterItemCollection";
import { BlockEditor } from "../Block/BlockEditor";

interface TaxonomyContainerProps {
    taxonomy: Item;
    route: RouteParams;
    onChangeRoute: Function;
}

interface TaxonomyContainerState {
    items: ItemCollection;
    filter: filterOptions;
    selectedItem: Item;
}




export class TaxonomyContainer extends React.Component<TaxonomyContainerProps, TaxonomyContainerState> {

    constructor(props: any) {

        super(props);

        let items = this.getTaxonomyItems();

        let selectedItem: Item;

        if (this.props.route.key)
            selectedItem = items[this.props.route.key];

        if (typeof selectedItem === 'undefined')
            selectedItem = new Item();

        this.state = {
            items: items,
            filter: undefined,
            selectedItem: selectedItem
        };

    }

    render() {

        let toolbar = this.renderToolbar();

        let block;

        if (this.props.route.page === 'create-screen') {

            block = <BlockEditor />

        } else if (this.props.route.page === 'list') {
            block = this.renderItemList();
        } else if (this.props.route.page === 'view') {
            block = this.renderItemProfile();
        } else if (this.props.route.page === 'add') {
            block = this.renderItemProfile();
        }

        return <div>

            {toolbar}

            {block}

        </div>

    }

    getTaxonomyItems(key?: string) {

        let items: ItemCollection;
        let localData: string;

        if (key)
            localData = localStorage.getItem(key);
        else
            localData = localStorage.getItem(this.props.taxonomy.key);

        console.log('local data is ', JSON.parse(localData))

        if (!localData)
            items = {};
        else
            items = JSON.parse(localData);

        return items;

    }

    handleInputChange(event: any) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name: string = target.name;

        let item = this.state.selectedItem;

        let clone = JSON.parse(JSON.stringify(item))
        clone[name] = value;

        this.setState({
            selectedItem: clone
        })

    }

    saveItem(item: Item) {

        var items = JSON.parse(JSON.stringify(this.state.items))

        items[this.state.selectedItem.key] = item;

        this.setState({
            items: items,
            selectedItem: new Item()
        });

        this.saveItems(items);

        this.changeRoute({
            page: "list",
            taxonomy: this.props.route.taxonomy
        });

    }

    changeRoute(routeParams: RouteParams) {

        this.props.onChangeRoute(routeParams);

    }

    componentWillReceiveProps(nextProps: TaxonomyContainerProps) {

        if (nextProps.route.page === "add") {
            console.log('will add a new guy')
            this.setState({
                selectedItem: new Item()
            });
        }

        if (this.props.taxonomy.key !== nextProps.taxonomy.key) {
            console.log('the taxonomy has changed!!!')
            this.setState({
                items: this.getTaxonomyItems(nextProps.taxonomy.key),
                filter: undefined,
                selectedItem: new Item()
            });

        }


    }

    deleteItem(item: Item) {

        let items = JSON.parse(JSON.stringify(this.state.items));

        delete items[item.key];

        this.setState({ items: items });

        this.saveItems(items);

    }

    saveItems(items: ItemCollection) {
        var json = JSON.stringify(items);

        localStorage.setItem(this.props.taxonomy.key, json);

    }

    renderItemList() {

        return <ItemList
            items={this.state.items}
            taxonomy={this.props.taxonomy}
            filter={this.state.filter}
            onDelete={(item: Item) => {
                this.deleteItem(item);
            }}
            onClick={(item: Item) => {

                this.setState({ selectedItem: item });

                this.changeRoute(
                    {
                        taxonomy: this.props.taxonomy.slug,
                        page: "view",
                        key: item.key
                    }
                );

            }}
        />
    }

    renderItemProfile() {

        return <ItemProfile
            item={this.state.selectedItem}
            fields={this.props.taxonomy.fields}
            taxonomy={this.props.taxonomy}
            onChange={(t: Item) => {

                this.handleInputChange(t);

            }}
            onSubmit={(t: Item) => {

                this.saveItem(t);

            }} />

    }

    renderToolbar() {

        //if (this.props.route.page === "list")
        return <TaxonomyToolbar
            taxonomy={this.props.taxonomy}
            route={this.props.route}
            onaddClick={() => {
                this.setState({ selectedItem: new Item() })
            }}
            onFilter={(filter: filterOptions) => {
                this.setState({
                    filter: filter
                });
            }}
            onRouteChange={(r: RouteParams) => {
                this.changeRoute(r)
            }}
            onClearFilter={() => {

                this.setState({
                    filter: undefined
                });

            }} />
    }



}