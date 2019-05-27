import { create } from '@dojo/framework/widget-core/tsx';
import { v } from '@dojo/framework/widget-core/d';

export interface ButtonProperties {
	label: string;
	onClick: () => void;
}

const createWidget = create().properties<ButtonProperties>();

export const Button = createWidget(({ properties }) => {
	const { key, label, onClick } = properties;

	return v('div', { classes: ['col-sm-6', 'smallpad'] }, [
		v('button', { id: `${key}`, classes: ['btn', 'btn-primary', 'btn-block'], onclick: onClick }, [label])
	]);
});
