import { RangeAtom } from '../atoms/range/range.js';
import { SwitchAtom } from '../atoms/switch/switch.js';

const Atoms = new Set([
  { name: 'pg-switch', key: SwitchAtom },
  { name: 'pg-range', key: RangeAtom },
]);

export const registerCustomElements = () => {
  for (let { name, key } of Atoms) {
    if (window.customElements.get(name)) break;
    window.customElements.define(name, key);
  }
};
