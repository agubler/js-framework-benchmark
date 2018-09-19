import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { Buttons, ButtonConfig } from './Buttons';
import { Store } from './Store';
import { RowHolder } from './RowHolder';

export class App extends WidgetBase {
	private store: Store = new Store();

	private run = () => {
		this.store.run();
		this.invalidate();
	}

	private add = () => {
		this.store.add();
		this.invalidate();
	}

	private update = () => {
		this.store.update();
	}

	private select = (id: number) => {
		this.store.select(id);
		this.invalidate();
	}

	private del = (id: number, key: string) => {
		this.store.delete(id, key);
		this.invalidate();
	}

	private runLots = () => {
		this.store.runLots();
		this.invalidate();
	}

	private clear = () => {
		this.store.clear();
		this.invalidate();
	}

	private swapRows = () => {
		this.store.swapRows();
		this.invalidate();
	}

	private _buttonConfigs: ButtonConfig[] = [
		{ id: 'run', label: 'Create 1,000 rows', onClick: this.run },
		{ id: 'runlots', label: 'Create 10,000 rows', onClick: this.runLots },
		{ id: 'add', label: 'Append 1,000 rows', onClick: this.add },
		{ id: 'update', label: 'Update every 10th row', onClick: this.update },
		{ id: 'clear', label: 'Clear', onClick: this.clear },
		{ id: 'swaprows', label: 'Swap Rows', onClick: this.swapRows }
	];

	protected render() {
		const { select, del, store } = this;

		const holders = store.state.map(({key, items}) =>
			w(RowHolder, { key, items, del, select, store, selected: store.selected })
		);

		return v('div', { key: 'root', classes: ['container'] }, [
			w(Buttons, { buttonConfigs: this._buttonConfigs }),
			v('table', { classes: ['table', 'table-hover', 'table-striped', 'test-data'] }, [
				v('tbody', holders)
			]),
			v('span', { classes: ['preloadicon', 'glyphicon', 'glyphicon-remove'] })
		]);
	}
}

export default App;
