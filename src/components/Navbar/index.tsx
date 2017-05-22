import * as React from "react";
import { NavbarButton } from "./NavbarButton";
import { NavBarButtons } from "./Buttons";

interface NavBarProps {
    onLinkClick: Function;
    projectName: string;
}

export class Navbar extends React.Component<NavBarProps, undefined> {

    render() {

        let leftButtons = Object.keys(NavBarButtons.leftButtons).map((parentKey, index) => {

            let button: any = NavBarButtons.leftButtons[parentKey];

            let children = Object.keys(button.children).map((childKey, index) => {

                let child = button.children[childKey];

                return <li key={index}>
                    <NavbarButton
                        target={child.target}
                        label={childKey}
                        onClick={(target: string) => { this.handleLinkClick(target) }}
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

        let rightButtons = Object.keys(NavBarButtons.rightButtons).map((key, index) => {

            let button = NavBarButtons.rightButtons[key];

            return <li key={index}>
                <NavbarButton
                    target={button.target}
                    label={key}
                    onClick={(target: string) => { this.handleLinkClick(target) }}
                    icon={button.icon} />
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

                        {leftButtons}

                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        {rightButtons}
                    </ul>
                </div>
            </div>
        </nav>;
    }

    handleLinkClick(e: string) {

        this.props.onLinkClick(e);

    }

}