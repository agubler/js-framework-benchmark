import { Destroyable } from '@dojo/framework/core/Destroyable';
import { WidgetMetaProperties, MetaBase, SupportedClassName } from '@dojo/framework/widget-core/interfaces';
import { findIndex } from '@dojo/framework/shim/array';

function random(max: number) {
	return Math.round(Math.random() * 1000) % max;
}

export interface Data {
	id: number;
	label: string;
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

const colours = [
	'red',
	'yellow',
	'blue',
	'green',
	'pink',
	'brown',
	'purple',
	'brown',
	'white',
	'black',
	'orange'
];

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

export class Store extends Destroyable implements MetaBase {
	private _invalidator: any;
	private _data: Data[] = [];
	private _selected: number | undefined;
	private _id = 1;

	constructor(properties: WidgetMetaProperties) {
		super();
		this._invalidator = properties.invalidate;
	}

	public get data(): Data[] {
		return this._data;
	}

	public get selected(): number | undefined {
		return this._selected;
	}

	private _buildData(count: number = 1000): Data[] {
		let data = [];
		for (let i = 0; i < count; i++) {
			const adjective = adjectives[random(adjectives.length)];
			const colour = colours[random(colours.length)];
			const noun = nouns[random(nouns.length)];
			const label = `${adjective} ${colour} ${noun}`;
			data.push({id: this._id, label });
			this._id++;
		}
		return data;
	}

	public updateData = (mod: number = 10) => {
		for (let i = 0; i < this._data.length; i += 10) {
			const data = this._data[i];
			this._data[i] = { ...data, label: `${data.label} !!!`};
		}
		this._invalidator();
	}

	public del = (id: number) => {
		const idx = findIndex(this._data, (item) => item.id === id);
		this._data.splice(idx, 1);
		this._invalidator();
	}

	public run = (): void => {
		this._data = this._buildData();
		this._selected = undefined;
		this._invalidator();
	}

	public add = (): void => {
		this._data = [ ...this._data, ...this._buildData() ];
		this._invalidator();
	}

	public update = (): void => {
		this.updateData();
		this._invalidator();
	}

	public select = (id: number) => {
		this._selected = id;
		this._invalidator();
	}

	public runLots = () => {
		this._data = this._buildData(10000);
		this._selected = undefined;
		this._invalidator();
	}

	public clear = () => {
		this._data = [];
		this._selected = undefined;
		this._invalidator();
	}

	public swapRows = () => {
		if (this._data.length > 998) {
			const row = this._data[1];
			this._data[1] = this._data[998];
			this._data[998] = row;
			this._invalidator();
		}
	}
}
