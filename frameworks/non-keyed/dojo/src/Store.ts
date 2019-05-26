import Map from '@dojo/framework/shim/Map';
import { create } from '@dojo/framework/widget-core/tsx';
import { invalidator as vdomInvalidator } from '@dojo/framework/widget-core/middleware/core';

function random(max: number) {
	return Math.round(Math.random() * 1000) % max;
}

const adjectives = [
	'pretty',
	'large',
	'big',
	'small',
	'tall',
	'short',
	'long',
	'handsome',
	'plain',
	'quaint',
	'clean',
	'elegant',
	'easy',
	'angry',
	'crazy',
	'helpful',
	'mushy',
	'odd',
	'unsightly',
	'adorable',
	'important',
	'inexpensive',
	'cheap',
	'expensive',
	'fancy'
];

const colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];

const nouns = [
	'table',
	'chair',
	'house',
	'bbq',
	'desk',
	'car',
	'pony',
	'cookie',
	'sandwich',
	'burger',
	'pizza',
	'mouse',
	'keyboard'
];

const factory = create({ vdomInvalidator });

let dataMap = new Map();
let selected: string | undefined;
let rowInvalidatorMap = new Map();
let labelInvalidatorMap = new Map();
let id = 1;
let keys: string[] = [];

function buildData(count: number = 1000, reset = true) {
	if (reset) {
		rowInvalidatorMap.clear();
		labelInvalidatorMap.clear();
		dataMap.clear();
	}
	for (let i = 0; i < count; i++) {
		const adjective = adjectives[random(adjectives.length)];
		const colour = colours[random(colours.length)];
		const noun = nouns[random(nouns.length)];
		const label = `${adjective} ${colour} ${noun}`;
		dataMap.set(id, { id, label });
		id++;
	}
	keys = Array.from(dataMap.keys());
}

export default factory(({ middleware: { vdomInvalidator: invalidator } }) => {
	return {
		get(id: string) {
			labelInvalidatorMap.set(id, invalidator);
			return dataMap.get(id);
		},
		getId(id: string) {
			rowInvalidatorMap.set(id, invalidator);
			const data = dataMap.get(id);
			if (data) {
				return data.id;
			}
		},
		getIds() {
			return keys;
		},
		isSelected(id: string) {
			return id === selected;
		},
		run(count = 1000) {
			buildData(count);
			invalidator();
		},
		add() {
			buildData(1000, false);
			invalidator();
		},
		update() {
			const ids = Array.from(dataMap.keys());
			for (let i = 0; i < ids.length; i += 10) {
				const item = dataMap.get(ids[i]);
				dataMap.set(ids[i], { ...item, label: `${item.label} !!!` });
				labelInvalidatorMap.get(ids[i])();
			}
		},
		swap() {
			const temp = dataMap.get(2);
			dataMap.set(2, dataMap.get(999));
			dataMap.set(999, temp);
			rowInvalidatorMap.get(2)();
			rowInvalidatorMap.get(999)();
		},
		clear() {
			dataMap.clear();
			keys = [];
			selected = undefined;
			rowInvalidatorMap.clear();
			labelInvalidatorMap.clear();
			invalidator();
		},
		del(id: string) {
			dataMap.delete(id);
			rowInvalidatorMap.get(id)();
			if (id === selected) {
				selected = undefined;
			}
			rowInvalidatorMap.delete(id);
			labelInvalidatorMap.delete(id);
		},
		select(id: string) {
			dataMap.set(selected, { ...dataMap.get(selected), selected: false });
			selected && rowInvalidatorMap.get(selected)();
			if (selected !== id) {
				dataMap.set(id, { ...dataMap.get(id), selected: true });
				rowInvalidatorMap.get(id)();
				selected = id;
			} else {
				selected = undefined;
			}
		}
	};
});
