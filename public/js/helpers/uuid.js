export class UuidGenerator {
  static get V4() {
    const first = UuidGenerator.#S4 + UuidGenerator.#S4;
    const second = UuidGenerator.#S4;
    const third = UuidGenerator.#S4;
    const fourth = UuidGenerator.#S4;
    const fifth = UuidGenerator.#S4 + UuidGenerator.#S4 + UuidGenerator.#S4;

    return `${first}-${second}-${third}-${this.#S4}-${fourth}-${fifth}`;
  }

  static get #S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}
