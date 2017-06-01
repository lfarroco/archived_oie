import * as React from 'react';

import { Navbar } from "./components/Navbar";
import { Content } from "./components/Content";
import { RouteParams } from "./components/Routes";
import { TaxonomyMap } from "./components/Taxonomy/TaxonomyItem";
import { Item } from "./components/Taxonomy/Taxonomy";
import { oieStore } from "./store";
import { AppData } from "./index";

export class App extends React.Component<AppData, undefined> {

    render() {
        return <div>

            <div className="app-bar">

                <h1>oie</h1>

            </div>

            <div className="app-container">

                <Navbar
                    onLinkClick={(route: string) => {
                        this.switchRoute(route)
                    }}
                    projectName="dalva"
                />
                <Content
                    route={this.props.route}
                    taxonomy={this.props.taxonomy}
                    onChangeRoute={(r: RouteParams) => {
                        this.handleChangeRoute(r);
                    }}
                />

            </div></div>
    }

    switchRoute(route: string) {

        location.hash = "#" + route;

        //initiates window.onhashchange, defined in this class' constructor

    }

    handleChangeRoute(route: RouteParams) {

        console.log('request to change route to:', route);

        var str = route.taxonomy;

        if (typeof route.taxonomy !== "undefined") {
            str += `/${route.page}`;

            if (typeof route.key !== "undefined") {
                str += `/${route.key}`;

            }
        }

        oieStore.dispatch({
            type: "CHANGE_ROUTE",
            route: route
        });

        this.switchRoute(str)
    }



}