import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetProperties, DNode } from '@dojo/framework/widget-core/interfaces';

export interface ButtonProperties {
	id: string;
	label: string;
	onClick: () => void;
}

export class Button extends WidgetBase<ButtonProperties> {

	private _onClick() {
		this.properties.onClick();
	}

	protected render(): DNode {
		const { id, label, onClick } = this.properties;

		return v('div', { classes: [ 'col-sm-6', 'smallpad' ] }, [
			v('button', {
				id,
				classes: [ 'btn', 'btn-primary', 'btn-block' ],
				onclick: onClick
			}, [ label ])
		]);
	}
}
