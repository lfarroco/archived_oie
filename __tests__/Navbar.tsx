import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';

import { NavbarButton } from "../src/components/Navbar/NavbarButton"


let testTarget = "test";
let label = "label";

function callback(data) {
    expect(data).toBe(testTarget);
}

const button: any = TestUtils.renderIntoDocument(
    <NavbarButton
        target={testTarget}
        label={label}
        onClick={callback}
        icon={"test-icon"} />
);

const NavbarButtonNode = ReactDOM.findDOMNode(button);

it('NavbarButton returns target on click', () => {

    TestUtils.Simulate.click(NavbarButtonNode);

});

it('Label should be rendered', () => {

    expect(NavbarButtonNode.textContent).toEqual(" " + label);

});