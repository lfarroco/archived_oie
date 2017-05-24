import * as React from "react";
import { NavbarButton } from "./NavbarButton";
import { NavBarButtons } from "./Buttons";

interface NavBarProps {
    onLinkClick: Function;
    projectName: string;
}
interface NavbarState {
    selected: string;
}

export class Navbar extends React.Component<NavBarProps, NavbarState> {

    constructor(props: NavBarProps) {

        super(props);

        this.state = { selected: '' }

    }

    render() {

        let buttons = Object.keys(NavBarButtons.leftButtons).map((parentKey, index) => {

            let button: any = NavBarButtons.leftButtons[parentKey];

            let children = Object.keys(button.children).map((childKey, index) => {

                let child = button.children[childKey];

                let isSelected = childKey === this.state.selected ? true : false;

                return <li key={index}>
                    <NavbarButton
                        target={child.target}
                        isSelected={isSelected}
                        label={childKey}
                        onClick={(target: string) => {
                            this.setState({ selected: childKey })
                            this.handleLinkClick(target)
                        }}
                        icon={child.icon} />
                </li>

            });

            return <li key={index}>

                <h4>{parentKey}</h4> <ul>{children}</ul> </li>

        });

        return <div className="sidebar">

            <ul className="list">

                {buttons}

            </ul>

        </div>
            ;
    }

    handleLinkClick(e: string) {


        this.props.onLinkClick(e);

    }

}