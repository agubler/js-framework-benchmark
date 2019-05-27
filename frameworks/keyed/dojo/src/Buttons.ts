import { create } from '@dojo/framework/widget-core/tsx';
import { v } from '@dojo/framework/widget-core/d';
import { Button } from './Button';

export interface ButtonConfig {
	label: string;
	onClick: () => void;
	key: string;
}

export interface ButtonsProperties {
	buttonConfigs: ButtonConfig[];
}

const createWidget = create().properties<ButtonsProperties>();

export const Buttons = createWidget(({ properties }) => {
	const { buttonConfigs } = properties;

	return v('div', { classes: ['jumbotron'] }, [
		v('div', { classes: ['row'] }, [
			v('div', { classes: ['col-md-6'] }, [v('h1', ['Dojo Keyed'])]),
			v('div', { classes: 'col-md-6' }, buttonConfigs.map((config) => Button({ ...config })))
		])
	]);
});
