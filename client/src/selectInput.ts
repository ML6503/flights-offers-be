import { Core } from './utils/core';

export default class SelectInput extends Core<HTMLElement> {
  node!: HTMLSelectElement;
  public onChange = (code: string) => {};

  private readonly select: Core<HTMLElement>;
  private options: [] | any[];
  private code: string;

  constructor(parent: HTMLElement, name: string, options: [] | any[]) {
    super(parent, 'select', `${name}-select`);
    this.node.name = name;
    this.code = '';

    this.options;
    options.map((item) => {
      let option = new Core(this.node, 'option', `${name}-option`, item.$.name);
      option.node.setAttribute('lang', 'ru');

      return option;
    });
    const allOption = new Core(this.node, 'option', `all-option`, 'ALL');
    allOption.node.setAttribute('selected', 'true');
    this.options = [allOption, ...options];

    this.node.onchange = (ev) => {
      let value = (ev.target as HTMLInputElement).value.substring(
        (ev.target as HTMLInputElement).selectionStart,
        (ev.target as HTMLInputElement).selectionEnd
      );

      if (value === 'ALL') {
        this.code = 'ALL';
        this.onChange('ALL');
      } else {
        for (let i = 0; i < options.length; i++) {
          if ((options[i] as any).$.name === value) {
            this.code = (options[i] as any).$.code;
          }
        }
        this.onChange(this.code);
      }
    };
  }

  getCode() {
    return this.code;
  }
}
