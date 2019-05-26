import { create, tsx } from '@dojo/framework/widget-core/tsx';
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
		rows.push(<Row id={id} key={id} />);
	}

	return (
		<div key="root" classes={['container']}>
			<Buttons buttonConfigs={buttonConfigs} />
			<table classes={['table', 'table-hover', 'table-striped', 'test-data']}>
				<tbody>{rows}</tbody>
			</table>
			<span classes={['preloadicon', 'glyphicon', 'glyphicon-remove']} />
		</div>
	);
});

export default App;
