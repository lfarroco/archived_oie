import * as React from "react";
import { Item } from "../Taxonomy/Taxonomy";
import { filterOptions } from "./filterItemCollection";

interface FilterFormProps {
    taxonomy: Item;
    onFilter: Function;
    onClearFilter: Function;
}

export interface FilterFormState extends filterOptions {
}


export class FilterForm extends React.Component<FilterFormProps, FilterFormState> {

    constructor(props: FilterFormProps) {

        super(props);

        this.state = {
            operator: { name: "Contém", symbol: "CONTAINS" },
            value: "",
            property: "ANY"
        }

    }

    render() {

        let props = Object.keys(this.props.taxonomy.fields).map(key => {
            return <option key={key} value={key}>{
                this.props.taxonomy.fields[key].label
            }</option>;
        });
        let operators = [
            { name: "Igual a", symbol: "===" },
            { name: "Maior que", symbol: ">" },
            { name: "Menor que", symbol: "<" },
            { name: "Maior ou igual a", symbol: ">=" },
            { name: "Menor ou igual a", symbol: "<=" },
            { name: "Contém", symbol: "CONTAINS" }
        ].map((op, index) => {
            return <option key={index} value={op.symbol}>{op.name}</option>;
        });

        return <form className="row" style={{ marginTop: 15, marginBottom: 15 }}
            onSubmit={e => {
                e.preventDefault();
                this.filter();
            }}
        >

            <div className="col-sm-2">
                <label>Campo</label>
                <select
                    value={this.state.property}
                    name="property"
                    className="form-control"
                    onChange={e => { this.handleInputChange(e); }}>
                    <option value="ANY">Todos</option>
                    {props}
                </select>
            </div>

            <div className="col-sm-2">
                <label>Operador</label>
                <select
                    value={this.state.operator.symbol}
                    name="operator"
                    className="form-control"
                    onChange={e => { this.handleInputChange(e); }}>
                    {operators}
                </select>
            </div>

            <div className="col-sm-2">
                <label>Valor</label>
                <input
                    name="value"
                    type="text"
                    onChange={e => { this.handleInputChange(e); }}
                    value={this.state.value}
                    className="form-control" />
            </div>

            <div className="col-sm-6">
                <button className="btn btn-primary"
                    type="submit"
                >Filtrar
                </button>
                <div className="btn btn-default"
                    onClick={e => { this.props.onClearFilter() }}>Limpar Filtro
                </div>
            </div>

        </form>

    }

    filter() {

        // let items = filterItemCollection({
        //     items: this.props.items,
        //     operator: this.state.operator,
        //     property: this.state.property,
        //     value: this.state.value
        // });

        this.props.onFilter(this.state);

    }

    handleInputChange(event: React.ChangeEvent<any>) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === "operator") {

            let operator: any = { symbol: value, name: "" };
            this.setState({ operator: operator });

        }
        else {
            this.setState({ [name]: value });
        }

    }

}