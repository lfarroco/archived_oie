import * as React from "react";

export interface FieldEditorItemProps {
    field: any;
    id: string;
    onChange: Function;
    onDelete: Function;
}

export class FieldEditorItem extends React.Component<FieldEditorItemProps, undefined> {

    render() {

        return <tr>

            <td>
                <select
                    value={this.props.field.type}
                    name="type"
                    className="form-control"
                    onChange={e => { this.handleInputChange(e); }}>

                    <option value="date">Texto</option>
                    <option value="date">Date</option>
                    <option value="email">Email</option>

                </select>
            </td>

            <td>
                <input
                    name="label"
                    type="text"
                    onChange={e => { this.handleInputChange(e); }}
                    value={this.props.field.label}
                    className="form-control" />
            </td>

            <td>
                <input
                    name="cols"
                    type="text"
                    onChange={e => { this.handleInputChange(e); }}
                    value={this.props.field.cols}
                    className="form-control" />
            </td>


            <td>
                <div className="btn btn-default"
                    onClick={(e: any) => {

                        this.handleDelete();
                    }}
                > <span className="glyphicon glyphicon-trash glyphicon-sm"></span>
                </div>
            </td>

        </tr>

    }

    handleInputChange(event: any) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.props.onChange(this.props.id, name, value);

    }

    handleDelete() {

        this.props.onDelete(this.props.id);

    }

}