import * as React from "react";

import { FieldEditorItem } from "./FieldEditorItem"

export interface FieldEditorProps {
    fields: any;
    onDelete: Function;
    onChange: Function;
    onAdd: Function;
}

export class FieldEditor extends React.Component<FieldEditorProps, undefined> {

    render() {

        console.log('re-rendering field editor')

        let toolbar = <div>

            <div className="btn btn-success"
                onClick={(e: any) => {
                    this.handleAdd();
                }}>
                <span className="glyphicon glyphicon-plus"></span>
                Adicionar Item
            </div>

        </div >

        let fieldList = Object.keys(this.props.fields).map((key, index) => {

            let field = this.props.fields[key];

            console.log('this is a field to be rendered', field)

            return <FieldEditorItem
                key={key}
                id={key}
                field={field}
                onChange={(id: string, name: string, value: string) => {

                    this.handleInputChange(id, name, value);

                }}
                onDelete={(id: string) => {

                    this.handleDelete(id);

                }}
            />

        });

        return <div className="col-sm-12">
            <div className="form-group row">

                {toolbar}

                <table className="table">
                    <thead>
                        <tr>

                            <th>Tipo</th><th>Etiqueta</th><th>Colunas</th><th width="1"></th>
                        </tr>

                    </thead>
                    <tbody>
                        {fieldList}
                    </tbody>
                </table>

            </div>
        </div>

    }

    handleAdd() {

        let key = new Date().getTime() + '_k';

        this.props.onAdd(key);

    }

    handleDelete(id: string) {

        this.props.onDelete(id);
    }

    handleInputChange(id: string, name: string, value: string) {

        this.props.onChange(id, name, value)

    }
}