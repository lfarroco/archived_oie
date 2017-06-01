import * as React from "react";

import { RouteParams } from "../Routes";
import { TaxonomyMap, ItemFieldsCollection } from "./TaxonomyItem"
import { Item } from "./Taxonomy";
import { FilterForm } from "../Filter/FilterForm";
import { FilterFormState } from "../Filter/FilterForm";

export interface TaxonomyToolbarProps {
    taxonomy: Item;
    route: RouteParams;
    onRouteChange: Function;
    onaddClick: Function;
    onFilter: Function;
    onClearFilter: Function;
}

export class TaxonomyToolbar extends React.Component<TaxonomyToolbarProps, undefined> {

    render() {

        let registerButton = this.registerButton();
        let listButton = this.listButton();

        let filterForm = <FilterForm
            taxonomy={this.props.taxonomy}
            onFilter={(filter: FilterFormState) => {

                this.props.onFilter(filter)
            }}
            onClearFilter={() => {
                this.props.onClearFilter();
            }
            }
        />

        return <div className="toolbar">

            {registerButton}

            {listButton}

        </div>


    }

    changeRoute(r: RouteParams) {

        this.props.onRouteChange(r);

    }

    registerButton() {

        //if (this.props.route.page === "list")
        return <div className="btn btn-success"
            onClick={e => {

                this.props.onaddClick();

            }}>
            Cadastrar {this.props.taxonomy.name}</div>


    }

    listButton() {
        return <div className="btn btn-default"
            onClick={e => {

                this.setState({
                    selectedItem: new Item()
                });

                this.changeRoute({
                    page: 'list',
                    taxonomy: this.props.route.taxonomy
                });

            }}>
            Listar {this.props.taxonomy.namePlural}</div>

    }

}

