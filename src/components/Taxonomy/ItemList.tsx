import * as React from "react";

import { TaxonomyMap } from "./TaxonomyItem";
import { ItemListDetails } from "./ItemListDetails";
import { Item } from "./Taxonomy";
import { filterOptions, filter, filterAnyProp } from "../Filter/filterItemCollection";

interface ItemListProps {
	items: TaxonomyMap;
	taxonomy: Item;
	filter: filterOptions;
	onClick?: Function;
	onDelete: Function;
}

export class ItemList extends React.Component<ItemListProps, undefined> {

	render() {

		let listFields: any = {};

		console.log('ItemList - this.props.taxonomy:', this.props.taxonomy)

		if (this.props.taxonomy.key === "dalva_taxonomies") {
			listFields = { "name": true, "namePlural": true, "slug": true };
		} else {

			Object.keys(this.props.taxonomy.fields).map(key => {

				listFields[key] = true;
			});

		}

		let head = Object.keys(listFields).map((key, index) => {

			let label = this.props.taxonomy.fields[key].label;

			return <th key={index}>{label}</th>

		});

		let list = Object.keys(this.props.items).map((key, index) => {

			let item = this.props.items[key];

			//if the list is not using a filter or the item is valid to the filter, render the line

			if (!this.props.filter || filter(item, this.props.filter)) {

				return <ItemListDetails
					key={key}
					item={item}
					listFields={listFields}
					onClick={(e: any) => { if (this.props.onClick) this.props.onClick(item) }}
					onDeleteItem={() => { if (this.props.onDelete) this.props.onDelete(item) }}
				/>

			}

		});

		return <div className="panel">
			<header><h4>{this.props.taxonomy.namePlural}</h4></header>
			<section>
				<table className="table">

					<thead><tr>{head}<th></th></tr></thead>

					<tbody>{list}</tbody>

				</table>
			</section>

		</div>

	}
}