import { SwitchAtom } from './atoms/switch/switch.js';
import { RangeAtom } from './atoms/range/range.js';

const Atoms = new Set([
  { name: 'pg-switch', key: SwitchAtom },
  { name: 'pg-range', key: RangeAtom },
]);

for (let { name, key } of Atoms) {
  if (window.customElements.get(name)) break;
  window.customElements.define(name, key);
}
