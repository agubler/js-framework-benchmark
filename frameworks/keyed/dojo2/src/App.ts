import { widget } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { Row } from './Row';
import { Buttons, ButtonConfig } from './Buttons';
import { Store } from  './Store';

export const App = widget(function App({ use }) {
	const { data, add, update, run, runLots, clear, swapRows, selected, select, del } = use(Store);
	const buttonConfigs = [
		{ id: 'run', label: 'Create 1,000 rows', onClick: run },
		{ id: 'runlots', label: 'Create 10,000 rows', onClick: runLots },
		{ id: 'add', label: 'Append 1,000 rows', onClick: add },
		{ id: 'update', label: 'Update every 10th row', onClick: update },
		{ id: 'clear', label: 'Clear', onClick: clear },
		{ id: 'swaprows', label: 'Swap Rows', onClick: swapRows }
	];
	const rows = data.map(({ id, label }, index) => {
		return w(Row, {
			id,
			key: id,
			label,
			onRowSelected: select,
			onRowDeleted: del,
			selected: id === selected
		});
	});

	return v('div', { key: 'root', classes: [ 'container' ] }, [
		w(Buttons, { buttonConfigs: buttonConfigs }),
		v('table', { classes: [ 'table', 'table-hover', 'table-striped', 'test-data' ] }, [
			v('tbody', rows)
		]),
		v('span', { classes: [ 'preloadicon', 'glyphicon', 'glyphicon-remove' ] })
	]);
});

export default App;
