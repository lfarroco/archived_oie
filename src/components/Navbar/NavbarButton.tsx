import * as React from "react";

interface NavBarProps {
    target: string;
    onClick: Function;
    icon: string;
    label: string;
    isSelected: boolean;
}

export class NavbarButton extends React.Component<NavBarProps, undefined> {

    render() {

        let selectedClass = this.props.isSelected ? 'selected' : '';

        return <a
            href={"#" + this.props.target}
            className={selectedClass}
            onClick={(e) => {
                e.preventDefault();
                this.onClick(this.props.target);
            }}>
            <span className={"glyphicon glyphicon-" + this.props.icon}></span> {this.props.label}
        </a>

    }

    onClick(target: string) {

        this.props.onClick(target);
    }

}