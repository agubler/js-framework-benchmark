import renderer from '@dojo/framework/widget-core/vdom';
import { v } from '@dojo/framework/widget-core/d';
import App from './App';

const r = renderer(() => App({}));
r.mount({ domNode: document.getElementById('app')! });
