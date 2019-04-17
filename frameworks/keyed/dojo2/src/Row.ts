import { widget } from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';

export interface RowProperties {
	onRowSelected: (id: number) => void;
	onRowDeleted: (id: number) => void;
	selected: boolean;
	label: string;
	id: number;
	key: string | number;
}

export const Row = widget<RowProperties>(({ properties }) => {
	const { onRowSelected, onRowDeleted, id, selected, label } = properties;
	const onDelete = () => {
		onRowDeleted(id);
	};
	const onClick = () => {
		onRowSelected(id);
	};
	return v('tr', {
			classes: [ selected ? 'danger' : null ]
		}, [
			v('td', { classes: [ 'col-md-1' ] }, [ `${id}` ]),
			v('td', { classes: [ 'col-md-4' ] }, [
				v('a', { onclick: onClick }, [ label ])
			]),
			v('td', { classes: [ 'col-md-1' ] }, [
				v('a', { onclick: onDelete }, [
					v('span', {
						'aria-hidden': true,
						classes: [ 'glyphicon', 'glyphicon-remove' ]
					})
				])
			]),
			v('td', { classes: [ 'col-md-6' ] })
		]
	);
});

export default Row;
