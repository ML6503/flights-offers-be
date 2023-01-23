import { Core } from './utils/core';
import { FlightsModel } from './store/flightsModel';

export class App extends Core<HTMLDivElement> {
  private flightsModel: FlightsModel;

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'app', '');
    this.flightsModel = new FlightsModel();
    // const regForm = new RegForm(this.el);
  }
}
