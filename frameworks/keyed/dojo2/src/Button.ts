import { widget } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';

export interface ButtonProperties {
	id: string;
	label: string;
	onClick: () => void;
	key: string | number;
}

export const Button = widget<ButtonProperties>(function Button({ properties }) {
		const { id, label, onClick } = properties;

		return v('div', { classes: [ 'col-sm-6', 'smallpad' ] }, [
			v('button', {
				id,
				classes: [ 'btn', 'btn-primary', 'btn-block' ],
				onclick: onClick
			}, [ label ])
		]);

}, true);
