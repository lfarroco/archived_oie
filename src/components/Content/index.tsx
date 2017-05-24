import * as React from 'react';
import { ItemFields } from "../Taxonomy/ItemFields";
import { TaxonomyContainer } from "../Taxonomy/TaxonomyContainer";
import { Item } from "../Taxonomy/Taxonomy";
import { RouteParams } from "../Routes";
import { ItemFieldsCollection } from "../Taxonomy/TaxonomyItem";
import { TaxonomyMap } from "../../constants";


interface ContentProps {
    route: RouteParams;
    taxonomies: TaxonomyMap;
    onChangeRoute: Function;
}

export class Content extends React.Component<ContentProps, undefined>{

    constructor(props: ContentProps) {

        super(props);

    }

    render() {

        let taxonomy = this.props.taxonomies[this.props.route.taxonomy];

        console.log(this.props.taxonomies, this.props.route.taxonomy)

        if (!taxonomy) {
            return <div className="container alert alert-danger">
                <strong>Erro!</strong> Url inválida.
            </div>
        }

        return <div className="container">
            <TaxonomyContainer
                taxonomy={taxonomy}
                route={this.props.route}
                onChangeRoute={(r: RouteParams) => {

                    this.handleRouteChange(r);

                }}
            />
        </div>
    }

    handleRouteChange(r: RouteParams) {

        this.props.onChangeRoute(r);

    }


}