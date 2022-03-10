export class SwitchAtom extends HTMLElement {
  static get OptionalAttributes() {
    return {
      Direction: 'switch-direction',
    };
  }

  static get SlotNames() {
    return {
      Label: 'switch-label',
      Control: 'switch-control',
    };
  }

  #container;
  #control;
  #direction;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.#validateAttributes();
    this.#addStyles();
    this.#addHtml();
    this.#setSwitch();

    this.#handleControl();
    this.#addEventListeners();
    this.#setCheckedState();
  }

  #validateAttributes() {
    this.#direction = this.getAttribute(
      SwitchAtom.OptionalAttributes.Direction
    );

    if (
      this.#direction &&
      this.#direction !== 'rtl' &&
      this.#direction !== 'ltr'
    ) {
      throw new Error(
        `Valid attributes for ${SwitchAtom.OptionalAttributes.Direction} are either ltr or rtl`
      );
    }
  }

  #addStyles() {
    const link = document.createElement('link');

    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'css/atoms/switch/switch.css');

    this.shadowRoot.appendChild(link);
  }

  #addHtml() {
    const container = this.#generateContainerElement();
    const labelSlot = this.#generateLabelSlot();
    const controlSlot = this.#generateControlSlot();

    container.appendChild(labelSlot);
    container.appendChild(controlSlot);

    this.shadowRoot.appendChild(container);
    this.#container = container;
  }

  #generateContainerElement() {
    const container = document.createElement('div');

    container.classList.add('container');
    container.classList.add(
      this.#direction?.length
        ? `container--${this.#direction}`
        : `container--ltr`
    );

    return container;
  }

  #generateLabelSlot() {
    const slot = document.createElement('slot');

    slot.name = SwitchAtom.SlotNames.Label;

    return slot;
  }

  #generateControlSlot() {
    const slot = document.createElement('slot');

    slot.name = SwitchAtom.SlotNames.Control;

    return slot;
  }

  #setSwitch() {
    const controlSlot = this.#container.querySelector(
      `[name="${SwitchAtom.SlotNames.Control}"]`
    );
    this.#control = controlSlot
      .assignedElements()
      .find((elem) => elem.tagName.toLowerCase() === 'input');
  }

  #handleControl() {
    this.#control.type = 'checkbox';
    this.#control.setAttribute('role', 'switch');
    this.#control.setAttribute('aria-checked', 'false');
  }

  #addEventListeners() {
    this.#control.addEventListener(
      'change',
      this.#handleChangeEvent.bind(this)
    );
  }

  #handleChangeEvent(e) {
    this.#setCheckedState();
  }

  #setCheckedState() {
    const isChecked = this.#control.checked;

    this.#control.value = isChecked ? 'on' : 'off';
    this.#control.setAttribute('aria-checked', `${isChecked}`);
  }
}
