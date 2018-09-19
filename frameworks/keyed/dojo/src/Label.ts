import { DNode } from '@dojo/framework/widget-core/interfaces';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { Store } from './Store';

export interface LabelProperties {
	store: Store;
	label: string;
	id: number;
	key: string;
}

export class Label extends WidgetBase<LabelProperties> {

	private _label = '';
	private _setup = false;

	protected render(): DNode {
		const { id, key, label, store } = this.properties;

		if (!this._setup) {
			store.onUpdate(id, key, (label: string) => {
				this._label = label;
				this.invalidate();
			});
			this._setup = true;
		}

		return this._label || label;
	}
}

export default Label;
