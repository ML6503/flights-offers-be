import { Core } from './utils/core';

export default class SelectInput extends Core<HTMLElement> {
  node!: HTMLSelectElement;

  private select: Core<HTMLElement>;
  private options: [] | any[];

  constructor(parent: HTMLElement, name: string, options: [] | unknown[]) {
    super(parent, 'select', `${name}-select`);
    this.node.name = name;
    // this.node.setAttribute('lang', 'ru');
    this.options = options;
    this.options.map((item) => {
      // console.log('displayed options info: ', item.$);

      let option = new Core(this.node, 'option', `${name}-option`, item.$.name);
      option.node.setAttribute('lang', 'ru');
      return option;
    });

    for (let i = 0; i < options.length; i++) {
      // console.log('displayed options info: ', options[i].$.name);
      // new Core(this.node, 'option', `${name}-option`, options[i].$.name);
    }
  }
}
