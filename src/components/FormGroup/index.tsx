import * as React from "react";

import { FieldEditor } from "./FieldEditor"

export interface FormGroupProps {
    label: string;
    name: string;
    type?: "text" | "email" | "date" | "fieldEditor" | "itemPicker";
    cols?: string;
    value: string;
    onChange: Function;
    onFieldChange: Function;
    onFieldAdd: Function;
    onFieldDelete: Function;
}

export class FormGroup extends React.Component<FormGroupProps, undefined> {

    render() {

        let input;

        if (this.props.type == 'fieldEditor')
            input = <FieldEditor
                fields={this.props.value || {}}
                onChange={(id: string, name: string, value: string) => {

                    this.props.onFieldChange(id, name, value);

                }}
                onDelete={(id: string) => {
                    this.props.onFieldDelete(id);
                }}
                onAdd={(id: string) => {

                    this.props.onFieldAdd(id);

                }}

            />
        if (this.props.type == 'itemPicker') {

            input = <div />

        }
        else
            input = <input
                type={this.props.type || "text"}
                value={this.props.value || ""}
                name={this.props.name}
                className="form-control"
                onChange={(e: any) => {

                    this.props.onChange(e)

                }} />;

        return <div className={this.props.cols || "col-sm-12"}>
            <div className="form-group">

                <label>{this.props.label}</label>

                {input}

            </div>
        </div>

    }

}