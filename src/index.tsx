import * as React from 'react';
import * as ReactDOM from "react-dom";

import { oieStore, appData } from './store';

//import { } from "react-redux"
//import {  } from 'redux'

import { App } from "./App";
import { Item } from "./components/Taxonomy/Taxonomy";
import { RouteParams, parseRoute } from "./components/Routes/index";

export interface AppData {
    taxonomy: Item;
    route: RouteParams;
}

class AppContainer extends React.Component<undefined, AppData> {

    unsubscribe: any;

    constructor(props: any) {

        super(props);

        let state: any = oieStore.getState();

        this.state = state;

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
        this.unsubscribe = oieStore.subscribe(() => {
            let state: any = oieStore.getState();
            this.setState(state)
        }
        );
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {

        console.log('GLOGAL STATE UPDATED:', this.state)

        return (
            <App
                taxonomy={this.state.taxonomy.items[this.state.route.taxonomy]}
                route={this.state.route}

            />
        )
    }
}
ReactDOM.render(
    <AppContainer />,
    document.getElementById('app')
);