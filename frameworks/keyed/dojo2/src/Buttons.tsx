import { create, tsx } from '@dojo/framework/widget-core/tsx';
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

	return (
		<div classes={['jumbotron']}>
			<div classes={['row']}>
				<div classes={['col-md-6']}>
					<h1>Dojo v5.0.0</h1>
				</div>
				<div classes={['col-md-6']}>
					{buttonConfigs.map((config) => (
						<Button {...config} />
					))}
				</div>
			</div>
		</div>
	);
});
