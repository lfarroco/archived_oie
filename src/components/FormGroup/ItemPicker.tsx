import * as React from "react";
import { ItemCollection } from "../Taxonomy/TaxonomyItem";
import { ItemList } from "../Taxonomy/ItemList";
import { Item } from "../Taxonomy/Taxonomy";

export interface ItemPickerProps {
    sourceItems: ItemCollection;
    targeetItems: ItemCollection;
    filter: Function;
    onDelete: Function;
    onChange: Function;
    onAdd: Function;
    taxonomy: Item;
    labelProperty: string;
}

export class ItemPicker extends React.Component<ItemPickerProps, undefined> {

    render() {

        console.log('re-rendering ItemPicker');

        let sourceItems = JSON.parse(JSON.stringify(this.props.sourceItems));

        let filteredItems: ItemCollection = {}

        Object.keys(sourceItems).map(key => {

            let item = sourceItems[key];

            if (this.props.filter(item))
                filteredItems[key] = item;

        });

        let options = Object.keys(filteredItems).map((key, index) => {

            let item = sourceItems[key];
            let label = item[this.props.labelProperty]
            //todo: add label property to parameters
            return <option key={index} value={key}>{label}</option>

        });

        let toolbar = <div>

            <select name="select"
                onChange={e => {
                    this.props.onChange(e)
                }}>
                {options}
            </select>

            <div className="btn btn-success"
                onClick={(e: any) => {
                    this.handleAdd();
                }}>
                <span className="glyphicon glyphicon-plus"></span>
                Adicionar Item
            </div>

        </div>

        let itemList = <ItemList
            taxonomy={this.props.taxonomy}
            filter={undefined}
            items={filteredItems}
            onDelete={(item: any) => this.handleDelete(item)}
        />

        return <div className="col-sm-12">


            {toolbar}

            {itemList}

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