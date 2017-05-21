import * as React from "react";
import { NavbarButton } from "./NavbarButton";
import { NavBarButtons } from "./Buttons";

interface NavBarProps {
    onLinkClick: Function;
    projectName: string;
}

export class Navbar extends React.Component<NavBarProps, undefined> {

    render() {

        let buttons = [];

        buttons = Object.keys(NavBarButtons).map((parentKey, index) => {

            let button: any = NavBarButtons[parentKey];

            let children = Object.keys(button.children).map((childKey, index) => {

                let child = button.children[childKey];

                return <li key={index}>
                    <NavbarButton
                        target={child.target}
                        label={childKey}
                        onClick={(e: string) => { this.handleLinkClick(e) }}
                        icon={child.icon} />
                </li>

            });

            return <li key={index}>
                <a href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown">
                    <span className={"glyphicon glyphicon-" + button.icon}></span> {parentKey}
                    <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">{children}</ul>
            </li>

        });

        return <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed"
                        data-toggle="collapse" data-target="#navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand"
                        href="#/">{this.props.projectName}</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">

                        {buttons}

                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#list/screens"> <span className="glyphicon glyphicon-list-alt"></span> Telas</a></li>
                        <li><a href="#list/routes"> <span className="glyphicon glyphicon-cog"></span> Rotas</a></li>
                        <li><a href="#list/taxonomies"> <span className="glyphicon glyphicon-list-th"></span> Taxonomias</a></li>
                    </ul>
                </div>
            </div>
        </nav>;
    }

    handleLinkClick(e: string) {

        this.props.onLinkClick(e);

    }

}