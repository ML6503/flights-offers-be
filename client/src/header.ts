import { Core } from './utils/core';
import SelectInput from './selectInput';
import Signal from './utils/signal';
export default class HeaderTable extends Core<HTMLDivElement> {
  public airlinesInput: SelectInput;
  public airportsInput: SelectInput;
  private labelAirports: Core;
  private labelAirlines: Core;
  private airlinesInputOptionData: [] | unknown[];
  private airportsInputOptionData: [] | unknown[];
  onFilterAiports: Signal<{ choice: string; status: boolean }> = new Signal<{
    choice: string;
    status: boolean;
  }>();
  onFilterAirlines: Signal<{ choice: string; status: boolean }> = new Signal<{
    choice: string;
    status: boolean;
  }>();

  public onFilterAirlinesChange: () => void = () => {};

  constructor(
    parent: HTMLElement,
    airlinesInputOptionData: [] | unknown[],
    airportsInputOptionData: [] | unknown[],
    onFilterAiports: Signal<{ choice: string; status: boolean }> = new Signal<{
      choice: string;
      status: boolean;
    }>(),
    onFilterAirlines: Signal<{ choice: string; status: boolean }> = new Signal<{
      choice: string;
      status: boolean;
    }>(),
    onFilterAirlinesChange: (code: string) => void = () => {}
  ) {
    super(parent, 'div', 'header', '');

    this.labelAirlines = new Core(this.node, 'label', '', 'airlines');
    this.labelAirlines.node.setAttribute('for', 'airlines');
    this.airlinesInput = new SelectInput(
      this.node,
      'airlines',
      airlinesInputOptionData
    );
    this.airlinesInput.onChange = () => {
      let code = this.airlinesInput.getCode();
      console.log('code:', this.airlinesInput.getCode());
      onFilterAirlinesChange(code);
    };
    // this.airlinesInput.node.onchange((ev: InputEvent) => {
    //   ev.preventDefault;
    //   onFilterAirlines.emit({
    //     choice: (ev.target as HTMLInputElement).value,
    //     status: true,
    //   });
    // });
    this.labelAirports = new Core(this.node, 'label', '', 'airports');
    this.labelAirlines.node.setAttribute('for', 'airports');
    this.airportsInput = new SelectInput(
      this.node,
      'airports',
      airportsInputOptionData
    );

    // 2 filters
    // фильтр Аэропорты. Создать возможность фильтровать перелеты по этому списку.
    // фильтр Авиакомпании. Создать возможность фильтровать перелеты по этому списку.
  }
}
