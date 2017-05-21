import * as React from "react";

interface NavBarProps {
    target: string;
    onClick: Function;
    icon: string;
    label: string;
}

export class NavbarButton extends React.Component<NavBarProps, undefined> {

    render() {

        return <a
            href={"#" + this.props.target}
            onClick={(e) => {
                e.preventDefault();
                this.onClick(e, this.props.target);
            }}>
            <span className={"glyphicon glyphicon-" + this.props.icon}></span> {this.props.label}
        </a>

    }

    onClick(e: React.MouseEvent<HTMLAnchorElement>, target: string) {

        e.preventDefault();
        this.props.onClick(target);
    }

}