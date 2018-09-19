import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetProperties, DNode } from '@dojo/framework/widget-core/interfaces';
import { Button } from './Button';

export interface ButtonConfig {
	id: string;
	label: string;
	onClick: () => void;
}

export interface ButtonsProperties {
	buttonConfigs: ButtonConfig[];
}

export class Buttons extends WidgetBase<ButtonsProperties> {

	protected render(): DNode {
		const { buttonConfigs } = this.properties;

		return v('div', { classes: [ 'jumbotron' ] }, [
			v('div', { classes: [ 'row' ] }, [
				v('div', { classes: [ 'col-md-6' ] }, [
					v('h1', ['Dojo v4.0.0'])
				]),
				v('div', { classes: [ 'col-md-6' ] }, buttonConfigs.map(({ id, label, onClick }) => {
					return w(Button, { key: id, id, label, onClick });
				}))
			])
		]);
	}
}
