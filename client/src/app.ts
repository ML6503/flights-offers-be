import './styles.css';
import { Core } from './utils/core';
import { FlightsModel } from './store/flightsModel';
import FlightsTable from './flightsTable';
import HeaderTable from './header';
export class App extends Core<HTMLDivElement> {
  private flightsModel: FlightsModel;
  private header: HeaderTable;

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'app', '');
    // let response = async () => await (await fetch('http://localhost:8080/')).json();
    // this.flightsData.push(await response.json());
    this.flightsModel = new FlightsModel();

    // let flightData = this.flightsModel.getflightsData();

    this.header = new HeaderTable(this.el);
    this.getFlightsForTable();
  }

  async getFlightsForTable() {
    let flightData = await this.flightsModel.fetchFlightData();
    const flightsTable = new FlightsTable(this.el, flightData);
    // console.log('flight data App :', flightData);
  }
}
