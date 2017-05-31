import * as React from 'react';
import { ItemFields } from "../Taxonomy/ItemFields";
import { PageContainer } from "../Taxonomy/PageContainer";
import { Item } from "../Taxonomy/Taxonomy";
import { RouteParams } from "../Routes";
import { ItemFieldsCollection } from "../Taxonomy/TaxonomyItem";
import { TaxonomyMap, PAGES } from "../../constants";


interface ContentProps {
    route: RouteParams;
    taxonomy: Item;
    onChangeRoute: Function;
}

export class Content extends React.Component<ContentProps, undefined>{

    constructor(props: ContentProps) {

        super(props);

    }

    render() {

        return <div className="container">
            <PageContainer
                taxonomy={this.props.taxonomy}
                route={this.props.route}
                pageOptions={PAGES[this.props.route.page]}
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