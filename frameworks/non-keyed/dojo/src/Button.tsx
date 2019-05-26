import { create, tsx } from '@dojo/framework/widget-core/tsx';

export interface ButtonProperties {
	label: string;
	onClick: () => void;
}

const createWidget = create().properties<ButtonProperties>();

export const Button = createWidget(({ properties }) => {
	const { key, label, onClick } = properties;

	return (
		<div classes={['col-sm-6', 'smallpad']}>
			<button id={`${key}`} classes={['btn', 'btn-primary', 'btn-block']} onclick={onClick}>
				{label}
			</button>
		</div>
	);
});
