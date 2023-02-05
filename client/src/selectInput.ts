import { Core } from './utils/core';

export default class SelectInput extends Core<HTMLElement> {
  node!: HTMLSelectElement;
  public onChange = (code: string) => {};

  private readonly select: Core<HTMLElement>;
  private options: [] | any[];
  private code: string;

  constructor(parent: HTMLElement, name: string, options: [] | unknown[]) {
    super(parent, 'select', `${name}-select`);
    this.node.name = name;
    this.code = '';
    // this.node.setAttribute('lang', 'ru');
    this.options = options;
    this.options.map((item) => {
      // console.log('displayed options info: ', item.$);

      let option = new Core(this.node, 'option', `${name}-option`, item.$.name);
      // option.node.setAttribute('lang', 'ru');

      return option;
    });

    for (let i = 0; i < options.length; i++) {
      // console.log('displayed options info: ', options[i].$.name);
      // new Core(this.node, 'option', `${name}-option`, options[i].$.name);
    }

    this.node.onchange = (ev) => {
      console.log('On input change', (ev.target as HTMLInputElement).value);
      let value = (ev.target as HTMLInputElement).value;
      for (let i = 0; i < options.length; i++) {
        if ((options[i] as any).$.name === value) {
          this.code = (options[i] as any).$.code;
          // console.log('code:', this.code);
        }
      }
      this.onChange(this.code);
    };
  }

  getCode() {
    return this.code;
  }
}
