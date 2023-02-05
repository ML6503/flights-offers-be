import { Core } from './utils/core';
import SelectInput from './selectInput';
import Signal from './utils/signal';
export default class HeaderTable extends Core<HTMLDivElement> {
  private filterHeading: Core<HTMLElement>;
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
    onFilterAirlinesChange: (code: string) => void = () => {},
    onFilterAirportsChange: (code: string) => void = () => {}
  ) {
    super(parent, 'div', 'header', '');
    this.filterHeading = new Core(
      this.node,
      'h4',
      'filter-heading',
      'Search by Ariline or by Airport'
    );
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

    this.labelAirports = new Core(this.node, 'label', '', 'airports');
    this.labelAirlines.node.setAttribute('for', 'airports');
    this.airportsInput = new SelectInput(
      this.node,
      'airports',
      airportsInputOptionData
    );

    this.airportsInput.onChange = () => {
      let code = this.airportsInput.getCode();
      console.log('code:', this.airportsInput.getCode());
      onFilterAirportsChange(code);
    };

    // 2 filters
    // фильтр Аэропорты. Создать возможность фильтровать перелеты по этому списку.
    // фильтр Авиакомпании. Создать возможность фильтровать перелеты по этому списку.
  }
}
