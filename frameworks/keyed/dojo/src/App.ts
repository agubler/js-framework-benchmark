import { create } from '@dojo/framework/widget-core/tsx';
import { v } from '@dojo/framework/widget-core/d';
import { Row } from './Row';
import { Buttons, ButtonConfig } from './Buttons';
import store from './store';

const createWidget = create({ store });

export const App = createWidget(({ middleware: { store } }) => {
	const buttonConfigs = [
		{ key: 'run', label: 'Create 1,000 rows', onClick: () => store.run() },
		{ key: 'runlots', label: 'Create 10,000 rows', onClick: () => store.run(10000) },
		{ key: 'add', label: 'Append 1,000 rows', onClick: () => store.add() },
		{ key: 'update', label: 'Update every 10th row', onClick: () => store.update() },
		{ key: 'clear', label: 'Clear', onClick: () => store.clear() },
		{ key: 'swaprows', label: 'Swap Rows', onClick: () => store.swap() }
	];
	const ids = store.getIds();
	let rows: any[] = [];
	for (let i = 0; i < ids.length; i++) {
		const id = ids[i];
		rows.push(Row({ id, key: id }));
	}

	return v('div', { classes: ['container'] }, [
		Buttons({ buttonConfigs }),
		v('table', { classes: ['table', 'table-hover', 'table-striped', 'test-data'] }, [v('tbody', rows)]),
		v('span', { classes: ['preloadicon', 'glyphicon', 'glyphicon-remove'] })
	]);
});

export default App;
