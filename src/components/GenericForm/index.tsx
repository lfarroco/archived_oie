import * as React from "react";

import { FormGroup } from "../FormGroup";
import { ItemFields } from "../Taxonomy/ItemFields";
import { ItemFieldsCollection } from "../Taxonomy/TaxonomyItem";

export interface GenericFormProps {
    element: any;
    onSubmit: Function;
    fields: ItemFieldsCollection;
}

export interface GenericFormState {
    element: any;
}

export class GenericForm extends React.Component<GenericFormProps, GenericFormState> {

    constructor(props: GenericFormProps) {
        super(props);

        let element = JSON.parse(JSON.stringify(this.props.element));

        //if (!element.fields)
        //element.fields = {};

        this.state = { element: element };

    }

    render() {

        const formGroupItems = Object.keys(this.props.fields).map((key, index) => {

            let field = this.props.fields[key];

            return <FormGroup
                key={index}
                type={field.type}
                name={key}
                label={field.label}
                value={this.state.element[key]}
                cols={field.cols}
                onChange={(e: any) => { this.handleInputChange(e) }}
                onFieldChange={(id: string, name: string, value: string) => {
                    this.handleFieldEditorChange(id, name, value)
                }}
                onFieldAdd={(name: string) => {
                    this.handleFieldEditorAdd(name)
                }}
                onFieldDelete={(id: string) => {
                    this.handleFieldEditorDelete(id)
                }}
            />

        });

        return <form

            onSubmit={e => {
                e.preventDefault();
                this.props.onSubmit(this.state.element)
            }}>

            <div className="row">
                {formGroupItems}
            </div>

            <input type="submit" value="Salvar" className="btn btn-info" />

        </form>

    }

    handleFieldEditorChange(id: string, name: string, value: string) {

        let element = JSON.parse(JSON.stringify(this.state.element));

        console.log(id, name, value)

        console.log('will update', element)

        element.fields[id][name] = value;

        console.log('updated', element)

        this.setState({ element: element })

    }

    handleFieldEditorAdd(id: string) {

        let element = JSON.parse(JSON.stringify(this.state.element));

        console.log(element);

        if (!element.fields)
            element.fields = {};

        element.fields[id] = {
            type: "",
            label: "",
            cols: ""
        };

        console.log('>>>', element)

        this.setState({ element: element })

    }

    handleFieldEditorDelete(id: string) {

        let element = JSON.parse(JSON.stringify(this.state.element));

        delete element.fields[id];

        this.setState({ element: element })

    }

    handleInputChange(event: any) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let element = JSON.parse(JSON.stringify(this.state.element));

        element[name] = value;

        this.setState({ element: element })

    }


}