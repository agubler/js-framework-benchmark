import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { w } from '@dojo/framework/widget-core/d';
import diffProperty from '@dojo/framework/widget-core/decorators/diffProperty';
import { reference } from '@dojo/framework/widget-core/diff';
import { Item, Store } from './Store';
import Row from './Row';

export interface RowHolderProperties {
	items: Item[];
	store: Store;
	selected?: number;
	select: any;
	del: any;
}

@diffProperty('items', reference)
export class RowHolder extends WidgetBase<RowHolderProperties> {
	private _delete(id: number) {
		this.properties.del(id, this.properties.key);
	}

	protected render() {
		const { key, items, selected, select, store } = this.properties;
		return items.map(({ id, label }) => {
			return w(Row, {
				id,
				key: id,
				holderKey: key,
				label,
				store,
				onRowSelected: select,
				onRowDeleted: this._delete,
				selected: id === selected
			});
		});
	}
}
