import { ToggleAtom } from './atoms/toggle/toggle.js';
import { RangeAtom } from './atoms/range/range.js';

const Atoms = new Set([
  { name: 'pg-toggle', key: ToggleAtom },
  { name: 'pg-range', key: RangeAtom },
]);

for (let { name, key } of Atoms) {
  window.customElements.define(name, key);
}
