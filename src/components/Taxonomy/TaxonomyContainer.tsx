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
}


export class TaxonomyContainer extends React.Component<TaxonomyContainerProps, TaxonomyContainerState> {

    constructor(props: any) {

        super(props);

        let items = this.getTaxonomyItems();

        let selectedItem: Item;

        if (this.props.route.key)
            selectedItem = items[this.props.route.key];

        this.state = {
            items: items,
            filter: undefined
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

            let item = JSON.parse(JSON.stringify(this.state.items[this.props.route.key]))
            block = this.viewItemProfile(item);

        } else if (this.props.route.page === 'add') {

            let item = new Item()
            block = this.viewItemProfile(item);

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

    saveItem(item: Item) {

        console.log('saving item with key', item.key)

        var items = JSON.parse(JSON.stringify(this.state.items))

        items[item.key] = item;

        this.saveItemsToDB(items);

        this.setState({
            items: items
        });

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
        }

        if (this.props.taxonomy.key !== nextProps.taxonomy.key) {
            console.log('the taxonomy has changed!!!')
            this.setState({
                items: this.getTaxonomyItems(nextProps.taxonomy.key),
                filter: undefined
            });

        }

    }

    deleteItem(item: Item) {

        let items = JSON.parse(JSON.stringify(this.state.items));

        delete items[item.key];

        this.setState({ items: items });

        this.saveItemsToDB(items);

    }

    saveItemsToDB(items: ItemCollection) {

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


    viewItemProfile(item: Item) {

        return <ItemProfile
            item={item}
            taxonomy={this.props.taxonomy}
            onSubmit={(item: Item) => {

                this.saveItem(item);

            }} />

    }

    renderToolbar() {

        //if (this.props.route.page === "list")
        return <TaxonomyToolbar
            taxonomy={this.props.taxonomy}
            route={this.props.route}
            onaddClick={() => {
                this.changeRoute({
                    page: 'add',
                    taxonomy: this.props.route.taxonomy
                })
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