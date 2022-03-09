import { UuidGenerator } from '../../helpers/uuid.js';

export class ToggleAtom extends HTMLElement {
  static get RequiredAttributes() {
    return {
      Label: 'toggle-label',
      AriaLabel: 'toggle-aria-label',
      Direction: 'toggle-direction',
    };
  }

  #input;
  #id;
  #labelText;
  #ariaLabelText;
  #direction;

  constructor() {
    super();

    this.#id = UuidGenerator.V4;

    this.attachShadow({ mode: 'open' });

    this.#validateAttributes();

    this.#addStyles();
    this.#addHtml();
    this.#addEventListeners();
    this.#setCheckedState();
  }

  #validateAttributes() {
    this.#labelText = this.getAttribute(ToggleAtom.RequiredAttributes.Label);
    this.#ariaLabelText = this.getAttribute(
      ToggleAtom.RequiredAttributes.AriaLabel
    );
    this.#direction = this.getAttribute(
      ToggleAtom.RequiredAttributes.Direction
    );

    if (!this.#labelText && !this.#ariaLabelText) {
      throw new Error(
        `You must provide either a ${ToggleAtom.RequiredAttributes.Label} attribute or a ${ToggleAtom.RequiredAttributes.AriaLabel} attribute`
      );
    }

    if (this.#labelText && this.#ariaLabelText) {
      throw new Error(
        `You cannot provide both a ${ToggleAtom.RequiredAttributes.Label} attribute and a ${ToggleAtom.RequiredAttributes.AriaLabel} attribute`
      );
    }

    if (
      this.#direction &&
      this.#direction !== 'rtl' &&
      this.#direction !== 'ltr'
    ) {
      throw new Error(
        `Valid attributes for ${ToggleAtom.RequiredAttributes.Direction} are either ltr or rtl`
      );
    }
  }

  #addStyles() {
    const link = document.createElement('link');

    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'css/atoms/toggle/toggle.css');

    this.shadowRoot.appendChild(link);
  }

  #addHtml() {
    const container = document.createElement('div');
    const input = document.createElement('input');

    container.classList.add('container');
    if (this.#direction?.length) {
      container.classList.add(`container--${this.#direction}`);
    }

    this.shadowRoot.appendChild(container);

    if (this.#labelText?.length) {
      const label = document.createElement('label');

      label.classList.add('container__label');
      label.setAttribute('for', `${this.#id}`);
      label.innerText = this.#labelText;

      container.appendChild(label);
    } else if (this.#ariaLabelText?.length) {
      input.setAttribute('title', this.#ariaLabelText);
      input.setAttribute('aria-label', this.#ariaLabelText);
    }

    input.id = this.#id;
    input.classList.add('container__input');
    input.type = 'checkbox';
    input.setAttribute('role', 'switch');

    container.appendChild(input);

    this.#input = input;
  }

  #addEventListeners() {
    this.#input.addEventListener('change', this.#handleChangeEvent.bind(this));
  }

  #handleChangeEvent(e) {
    this.#setCheckedState();
  }

  #setCheckedState() {
    const isChecked = this.#input.checked;

    this.#input.value = isChecked ? 'on' : 'off';
    this.#input.setAttribute('aria-checked', `${isChecked}`);
  }
}
