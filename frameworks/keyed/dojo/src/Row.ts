import { DNode } from '@dojo/framework/widget-core/interfaces';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { Store } from './Store';
import { Label } from './Label';

export interface RowProperties {
	onRowSelected: (id: number) => void;
	onRowDeleted: (id: number) => void;
	store: Store;
	selected: boolean;
	holderKey: any;
	label: string;
	id: number;
}

export class Row extends WidgetBase<RowProperties> {
	private _onDelete() {
		const { onRowDeleted, id } = this.properties;
		onRowDeleted(id);
	}

	private _onClick() {
		const { onRowSelected, id } = this.properties;
		onRowSelected(id);
	}

	protected render(): DNode {
		const { id, selected, label, store, holderKey } = this.properties;

		return v('tr', {
			classes: [selected ? 'danger' : null]
		},
			[
				v('td', { classes: ['col-md-1'] }, [`${id}`]),
				v('td', { classes: ['col-md-4'], onclick: this._onClick }, [
					v('a', { onclick: this._onClick }, [
						w(Label, { store, label, id, key: holderKey })
					])
				]),
				v('td', { classes: ['col-md-1'] }, [
					v('a', { onclick: this._onDelete }, [
						v('span', {
							'aria-hidden': true,
							classes: ['glyphicon', 'glyphicon-remove']
						})
					])
				]),
				v('td', { classes: ['col-md-6'] })
			]
		);
	}
}

export default Row;
