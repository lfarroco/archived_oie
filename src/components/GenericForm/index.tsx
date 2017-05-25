import * as React from "react";

import { FormGroup } from "../FormGroup";
import { ItemFields } from "../Taxonomy/ItemFields";
import { ItemFieldsCollection } from "../Taxonomy/TaxonomyItem";
import { Item } from "../Taxonomy/Taxonomy";

export interface GenericFormProps {
    taxonomy: Item;
    item: Item;
    onSubmit: Function;
}

export class GenericForm extends React.Component<GenericFormProps, Item> {

    constructor(props: GenericFormProps) {
        super(props);

        let item: Item = JSON.parse(JSON.stringify(this.props.item));

        let state: Item = new Item();

        Object.keys(item).map(key => {

            state[key] = item[key];

        })

        if (!state.fields) state.fields = {};

        this.state = state;

    }

    render() {

        const formGroupItems = Object.keys(this.props.taxonomy.fields).map((key, index) => {

            let field = this.props.taxonomy.fields[key];

            return <FormGroup
                key={index}
                type={field.type}
                name={key}
                label={field.label}
                value={this.state[key]}
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
            className="panel"

            onSubmit={e => {
                e.preventDefault();
                this.props.onSubmit(this.state)
            }}>

            <header>
                <h4>Cadastrar {this.props.taxonomy.name}</h4>
            </header>

            <section>
                {formGroupItems}
            </section>

            <footer>
                <input type="submit" value="Salvar" className="btn btn-info" />
            </footer>

        </form>

    }

    handleFieldEditorChange(id: string, name: string, value: string) {

        let fields = JSON.parse(JSON.stringify(this.state.fields));

        fields[id][name] = value;

        this.setState({ fields: fields })

    }

    handleFieldEditorAdd(id: string) {

        let fields = JSON.parse(JSON.stringify(this.state.fields));

        if (!fields)
            fields = {};

        fields[id] = {
            type: "",
            label: "",
            cols: ""
        };

        this.setState({ fields: fields })

    }

    handleFieldEditorDelete(id: string) {

        let fields = JSON.parse(JSON.stringify(this.state.fields));

        delete fields[id];

        this.setState({ fields: fields })

    }

    handleInputChange(event: any) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value })

    }

    componentWillReceiveProps(nextProps: GenericFormProps) {

        this.setState({
            item: nextProps.item
        });
    }

}