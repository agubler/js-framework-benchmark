import { create } from '@dojo/framework/widget-core/tsx';
import { v } from '@dojo/framework/widget-core/d';
import store from './store';

export interface RowProperties {
	id: string;
}

const createWidget = create({ store }).properties<RowProperties>();

const Label = createWidget(({ properties, middleware: { store } }) => {
	const { id } = properties;
	const data = store.get(id);
	const onClick = () => {
		store.select(id);
	};
	return v('a', { onclick: onClick }, [data.label]);
});

export const Row = createWidget(({ properties, middleware: { store } }) => {
	const { id, key } = properties;
	const dataId = store.getId(id);
	if (!dataId) {
		return null;
	}
	const onDelete = () => {
		store.del(id);
	};
	return v('tr', { key: dataId, classes: [store.isSelected(id) && 'danger'] }, [
		v('td', { classes: ['col-md-1'] }, [`${dataId}`]),
		v('td', { classes: ['col-md-4'] }, [Label({ id })]),
		v('td', { classes: ['col-md-1'] }, [
			v('a', { onclick: onDelete }, [
				v('span', { 'aria-hidden': true, classes: ['glyphicon', 'glyphicon-remove'] })
			])
		]),
		v('td', { classes: ['col-md-6'] })
	]);
});

export default Row;
