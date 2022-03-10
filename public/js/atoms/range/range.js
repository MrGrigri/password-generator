export class RangeAtom extends HTMLElement {
  static get SlotNames() {
    return {
      Control: 'range-control',
    };
  }

  #container;
  #control;
  #minBounds;
  #minAmount;
  #maxBounds;
  #maxAmount;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.#addStyles();
    this.#addHtml();
    this.#setControl();

    this.#handleControl();

    this.#minBounds.innerText = this.#minAmount;
    this.#maxBounds.innerText = this.#maxAmount;
  }

  #addStyles() {
    const link = document.createElement('link');

    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'css/atoms/range/range.css');

    this.shadowRoot.appendChild(link);
  }

  #addHtml() {
    const container = this.#generateContainerElement();
    const minBoundsElement = this.#generateBoundsElement(true);
    const controlSlot = this.#generateControlSlot();
    const maxBoundsElement = this.#generateBoundsElement();

    container.appendChild(minBoundsElement);
    container.appendChild(controlSlot);
    container.appendChild(maxBoundsElement);

    this.#container = container;
    this.#minBounds = minBoundsElement;
    this.#maxBounds = maxBoundsElement;

    this.shadowRoot.appendChild(container);
  }

  #generateContainerElement() {
    const container = document.createElement('div');

    container.classList.add('container');

    return container;
  }

  #generateBoundsElement(isMin = false) {
    const boundsElement = document.createElement('div');

    boundsElement.classList.add('container__bounds');
    boundsElement.classList.add(
      isMin ? 'container__bounds--min' : 'container__bounds__max'
    );

    return boundsElement;
  }

  #generateControlSlot() {
    const slot = document.createElement('slot');

    slot.name = RangeAtom.SlotNames.Control;

    return slot;
  }

  #setControl() {
    const controlSlot = this.#container.querySelector(
      `[name="${RangeAtom.SlotNames.Control}"]`
    );
    this.#control = controlSlot
      .assignedElements()
      .find((element) => element.tagName.toLowerCase() === 'input');
    this.#minAmount = this.#control?.min?.length
      ? parseFloat(this.#control.min)
      : 0;
    this.#maxAmount = this.#control?.max?.length
      ? parseFloat(this.#control.max)
      : 100;
  }

  #handleControl() {
    this.#control.type = 'range';
  }
}
