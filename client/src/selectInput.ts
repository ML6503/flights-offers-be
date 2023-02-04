import { Core } from './utils/core';

export default class SelectInput extends Core<HTMLElement> {
  node!: HTMLSelectElement;

  private select: Core<HTMLElement>;
  private options: [] | any[];

  constructor(parent: HTMLElement, name: string, options: [] | unknown[]) {
    super(parent, 'select', `${name}-select`);
    this.node.name = name;
    this.options = options;
    this.options.map((item) => {
      return item.$.name;
    });

    for (let i = 0; i < options.length; i++) {
      // console.log(
      //   'displayed flights info: ',
      //   new TransfromOffer(flightsData[i])
      // );
      // new Core(this.node, 'option', `${name}-option`, options[i].$.name);
    }
  }
}
