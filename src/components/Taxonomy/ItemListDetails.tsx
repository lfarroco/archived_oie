import * as React from "react";
import { Item } from "./Taxonomy";

export interface ItemListDetailsProps {
    item: any;
    onClick: Function;
    onDeleteItem: Function;
    listFields: listFields;
}

export interface listFields {
    [name: string]: string;
}

export class ItemListDetails extends React.Component<ItemListDetailsProps, undefined> {

    render() {

        let listFields = Object.keys(this.props.listFields).map((key: any, index) => {

            return <td
                key={index}
                onClick={(e: any) => {
                    this.props.onClick(e)
                }}> {this.props.item[key]} </td>;

        });

        return <tr >

            {listFields}

            <td width="1">

                <span className="pull-right"
                    onClick={(e) => {
                        this.props.onDeleteItem(e)
                    }}
                >
                    <span className="btn btn-xs btn-default">
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </span>
                </span>

            </td>

        </tr>

    }

}