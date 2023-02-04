import { Core } from './utils/core';
import SelectInput from './selectInput';
export default class HeaderTable extends Core<HTMLDivElement> {
  public airlinesInput: SelectInput;
  public airportsInput: SelectInput;
  private labelAirports: Core;
  private labelAirlines: Core;
  private inputOptionData: [] | unknown[];

  constructor(parent: HTMLElement, inputOptionData: [] | unknown[]) {
    super(parent, 'div', 'header', '');

    this.labelAirlines = new Core(this.node, 'label', '', 'airlines');
    this.labelAirlines.node.setAttribute('for', 'airlines');
    this.airlinesInput = new SelectInput(
      this.node,
      'airlines',
      inputOptionData
    );

    this.labelAirports = new Core(this.node, 'label', '', 'airports');
    this.labelAirlines.node.setAttribute('for', 'airports');
    this.airportsInput = new SelectInput(
      this.node,
      'airports',
      inputOptionData
    );
    // 2 filters
    // фильтр Аэропорты. Создать возможность фильтровать перелеты по этому списку.
    // фильтр Авиакомпании. Создать возможность фильтровать перелеты по этому списку.
  }
}
