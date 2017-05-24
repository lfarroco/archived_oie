import * as React from 'react';

import { Navbar } from "./components/Navbar";
import { Content } from "./components/Content";
import { parseRoute, RouteParams } from "./components/Routes";
import { TaxonomyMap, DefaultTaxonomyMap } from "./constants"
import { ItemCollection } from "./components/Taxonomy/TaxonomyItem";

interface AppState {
    route: RouteParams;
    taxonomies: TaxonomyMap;
}

export class App extends React.Component<undefined, AppState> {

    constructor(props: any) {
        super(props);

        let route = parseRoute();

        let taxonomies = this.loadTaxonomies();

        this.state = {
            route: route,
            taxonomies: taxonomies
        };

        window.onhashchange = (ev) => {

            if (ev.newURL.indexOf("#") > -1) {

                let str = ev.newURL.split('#')[1];

                this.switchRoute(str);

            }
        }//onHashChange

    }

    render() {
        return <div>

            <div className="app-bar">

                oie

            </div>

            <div className="app-container">

                <Navbar
                    onLinkClick={(route: string) => {
                        this.switchRoute(route)
                    }}
                    projectName="dalva"
                />
                <Content
                    route={this.state.route}
                    taxonomies={this.state.taxonomies}
                    onChangeRoute={(r: RouteParams) => {
                        this.handleChangeRoute(r);
                    }}
                />

            </div></div>
    }

    switchRoute(route: string) {

        console.log('clicked on ', route)

        location.hash = "#" + route;

        let routeParams = parseRoute(route);

        this.setState({ route: routeParams });

    }

    handleChangeRoute(route: RouteParams) {

        console.log('route:', route);

        var str = route.taxonomy;

        if (typeof route.taxonomy !== "undefined") {
            str += `/${route.page}`;

            if (typeof route.key !== "undefined") {
                str += `/${route.key}`;

            }
        }

        this.switchRoute(str)
    }

    parseTaxonomies(taxonomies: ItemCollection) {

        let taxonomyMap: TaxonomyMap = {};

        Object.keys(taxonomies).map(key => {

            let slug = taxonomies[key].slug;

            taxonomyMap[slug] = taxonomies[key];

        })

        console.log(taxonomyMap);

        return taxonomyMap;

    }

    loadTaxonomies() {

        let taxonomies = JSON.parse(localStorage.getItem('dalva_taxonomies'));

        if (!taxonomies) {
            console.log('using default taxonomy map')
            taxonomies = DefaultTaxonomyMap;
        } {
            console.log('parsing taxonomies')
            taxonomies = this.parseTaxonomies(taxonomies);
        }

        taxonomies.taxonomies = DefaultTaxonomyMap.taxonomies;
        taxonomies.routes = DefaultTaxonomyMap.routes;
        taxonomies.employees = DefaultTaxonomyMap.employees;
        taxonomies.lessons = DefaultTaxonomyMap.lessons;
        taxonomies.classes = DefaultTaxonomyMap.classes;
        taxonomies.disciplines = DefaultTaxonomyMap.disciplines;

        return taxonomies;
    }
}