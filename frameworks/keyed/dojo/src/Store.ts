import { findIndex } from '@dojo/framework/shim/array';
import { uuid } from '@dojo/framework/core/util';

function random(max: number) {
	return Math.round(Math.random() * 1000) % max;
}

export interface State {
	key: string;
	items: Item[];
}

export interface Item {
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

export class Store {
	public state: State[] = [];
	public selected: number | undefined;
	public key = uuid();
	private _id = 1;
	private _invalidator: any = Object.create(null);

	onUpdate(id: number, key: string, cb: any) {
		if (!this._invalidator[`${id}-${key}`]) {
			this._invalidator[`${id}-${key}`] = cb;
		}
	}

	private _buildData(count: number = 1000): Item[] {
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

	public updateData(mod: number = 10): void {
		this.state.forEach((data) => {
			for (let i = 0; i < data.items.length; i += 10) {
				const item = data.items[i];
				data.items[i] = { ...data.items[i], label: `${data.items[i].label} !!!`};
				this._invalidator[`${item.id}-${data.key}`](data.items[i].label);
			}
		});
	}

	public delete(id: number, key: string): void {
		for (let i = 0; i < this.state.length; i++) {
			if (this.state[i].key === key) {
				console.log('here');
				const idx = findIndex(this.state[i].items, (item) => item.id === id);
				this.state[i].items.splice(idx, 1);
				this.state[i].items = [...this.state[i].items];
				break;
			}
		}
	}

	public run(rows = 1000): void {
		this.state = [{
			items: this._buildData(rows),
			key: uuid()
		}];
		this.selected = undefined;
	}

	public add(): void {
		this.state.push({
			items: this._buildData(),
			key: uuid()
		});
	}

	public update(): void {
		this.updateData();
	}

	public select(id: number) {
		this.selected = id;
	}

	public runLots() {
		this.run(10000);
	}

	public clear() {
		this.state = [];
		this.selected = undefined;
	}

	public swapRows() {
		if (this.state[0].items.length > 998) {
			const row = this.state[0].items[1];
			this.state[0].items[1] = this.state[0].items[998];
			this.state[0].items[998] = row;
			this.state[0].items = [...this.state[0].items];
		}
	}
}
