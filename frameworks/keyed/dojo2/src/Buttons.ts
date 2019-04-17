import { widget } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { Button } from './Button';

export interface ButtonConfig {
	id: string;
	label: string;
	onClick: () => void;
	key: string | number;
}

export interface ButtonsProperties {
	buttonConfigs: ButtonConfig[];
}

export const Buttons = widget<ButtonsProperties>(function Buttons({ properties }) {
	const { buttonConfigs } = properties;

	return v('div', { classes: [ 'jumbotron' ] }, [
		v('div', { classes: [ 'row' ] }, [
			v('div', { classes: [ 'col-md-6' ] }, [
				v('h1', ['Dojo v5.0.0'])
			]),
			v('div', { classes: [ 'col-md-6' ] }, buttonConfigs.map(({ id, label, onClick }) => {
				return w(Button, { key: id, id, label, onClick });
			}))
		])
	]);
}, true);
