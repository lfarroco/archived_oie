import * as React from "react";

import { ItemCollection, ItemFieldsCollection } from "./TaxonomyItem"

import { ItemFields } from "./ItemFields";
import { RouteParams } from "../Routes";

import { TaxonomyToolbar } from "./TaxonomyToolbar"
import { Item } from "./Taxonomy";

import { filterOptions } from "../Filter/filterItemCollection";
import { BlockEditor } from "../Block/BlockEditor";

import { Page } from "../Page/Page"
import { PAGES, PageConfig } from "../../constants";
import { oieStore } from "../../store";

interface TaxonomyContainerProps {
    taxonomy: Item;
    route: RouteParams;
    onChangeRoute: Function;
    pageOptions: PageConfig;
}

interface TaxonomyContainerState {
    data: ItemCollection | Item;
    filter: filterOptions;
}



export class PageContainer extends React.Component<TaxonomyContainerProps, TaxonomyContainerState> {

    constructor(props: any) {

        super(props);

        let taxonomySlug = this.props.taxonomy ? this.props.taxonomy.slug : "clients";

        console.log('****', taxonomySlug, this.props.pageOptions.dataType);

        this.state = {
            data: this.getPageData(taxonomySlug, this.props.pageOptions.dataType, this.props.route.key),
            filter: undefined
        };

    }

    render() {

        let pageTitle = this.props.pageOptions.title
            .replace('%name%', this.props.taxonomy.name)
            .replace('%namePlural%', this.props.taxonomy.namePlural);

        console.log('pageTitle is', pageTitle)

        return <Page
            taxonomy={this.props.taxonomy}
            route={this.props.route}
            components={this.props.pageOptions.components}
            data={this.state.data}
            title={pageTitle}
            onChangeRoute={this.props.onChangeRoute}
            onAddItem={this.addItem.bind(this)}
            onDeleteItem={this.deleteItem.bind(this)}
            onUpdateItem={this.updateItem.bind(this)}
        />

    }
    addItem(item: Item) {

        this.saveItem(item);
        //this.changeRoute({ page: "list", taxonomy: this.props.taxonomy.slug })

    }
    updateItem(item: Item) {

        this.saveItem(item);
        this.changeRoute({ page: "list", taxonomy: this.props.taxonomy.slug })

    }

    deleteItem(item: Item) {

        let data = JSON.parse(JSON.stringify(this.state.data));

        delete data[item.key];

        this.setState({ data: data });

        this.saveItemsToDB(data);

    }


    getPageData(taxonomyKey: string, dataType: "single" | "all", itemKey?: string) {

        let data: ItemCollection;
        let localData: string;
        let result: ItemCollection | Item;

        console.log(oieStore.getState(), taxonomyKey)

        let taxonomy = oieStore.getState().taxonomies[taxonomyKey];
        console.log('getting page data...')

        switch (dataType) {
            case "single":
                result = taxonomy.items[itemKey]
                break;
            case "all":
                result = taxonomy.items;
                break;
            default:
                result = {};
        }

        console.log('will return this data::', result)

        return result;
    }

    saveItem(item: Item) {

        oieStore.dispatch({
            type: "CREATE_ITEM",
            taxonomy: this.props.taxonomy,
            item: item,
            nextPage: "list"
        })

    }

    changeRoute(routeParams: RouteParams) {

        this.props.onChangeRoute(routeParams);

    }

    componentWillReceiveProps(nextProps: TaxonomyContainerProps) {

        if (nextProps.route.page === "add") {
            console.log('will add new data')
        }

        if (this.props.route !== nextProps.route) {
            console.log('will change route')

            let itemKey = nextProps.route.key;

            this.state = {
                data: this.getPageData(nextProps.taxonomy.slug, nextProps.pageOptions.dataType, itemKey),
                filter: undefined
            };
        }



    }



    saveItemsToDB(items: ItemCollection) {

        var json = JSON.stringify(items);

        localStorage.setItem(this.props.taxonomy.key, json);

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