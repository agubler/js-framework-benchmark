import { create, tsx } from '@dojo/framework/widget-core/tsx';
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
	return <a onclick={onClick}>{data.label}</a>;
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
	return (
		<tr classes={[store.isSelected(id) && 'danger']}>
			<td classes={['col-md-1']}>{`${dataId}`}</td>
			<td classes={['col-md-4']}>
				<Label id={id} />
			</td>
			<td classes={['col-md-1']}>
				<a onclick={onDelete}>
					<span aria-hidden={true} classes={['glyphicon', 'glyphicon-remove']} />
				</a>
			</td>
			<td classes={['col-md-6']} />
		</tr>
	);
});

export default Row;
