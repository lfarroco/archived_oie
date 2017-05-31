import * as React from 'react';
import * as ReactDOM from "react-dom";

import { oieStore, appData } from './store';

//import { } from "react-redux"
//import {  } from 'redux'

import { App } from "./App";
import { Item } from "./components/Taxonomy/Taxonomy";
import { RouteParams, parseRoute } from "./components/Routes/index";
import { ItemCollection } from "./components/Taxonomy/TaxonomyItem";

export interface AppContainerState {
    taxonomies: ItemCollection;
    route: RouteParams;
}

class AppContainer extends React.Component<undefined, AppContainerState> {

    unsubscribe: any;

    constructor(props: any) {

        super(props);

        this.state = oieStore.getState();

        window.onhashchange = (ev) => {

            if (ev.newURL.indexOf("#") > -1) {

                let str = ev.newURL.split('#')[1];
                let routeParams = parseRoute(str);

                oieStore.dispatch({
                    type: "CHANGE_ROUTE",
                    route: routeParams
                });

            }

        }//onHashChange


    }
    componentDidMount() {
        this.unsubscribe = oieStore.subscribe(() =>
            this.setState(oieStore.getState())
        );
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {

        console.log('GLOGAL STATE UPDATED:', this.state)

        return (
            <App
                taxonomy={this.state.taxonomies[this.state.route.taxonomy]}
                route={this.state.route}

            />
        )
    }
}
ReactDOM.render(
    <AppContainer />,
    document.getElementById('app')
);