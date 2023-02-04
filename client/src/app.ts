import './styles.css';
import { Core } from './utils/core';
import { FlightsModel } from './store/flightsModel';
import FlightsTable from './flightsTable';
import HeaderTable from './header';
import { IFlightInfo } from './utils/interfaces';
export class App extends Core<HTMLDivElement> {
  private flightsModel: FlightsModel;
  private header: HeaderTable;
  private flightData: [] | IFlightInfo[];
  private airportData: [] | unknown[];

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'app', '');
    // let response = async () => await (await fetch('http://localhost:8080/')).json();
    // this.flightsData.push(await response.json());
    this.flightsModel = new FlightsModel();

    // let flightData = this.flightsModel.getflightsData();
    this.flightData = [];
    this.airportData = [];

    (async () => {
      await this.getFlightsForTable();
      await this.getAirportsForTable();
      this.header = new HeaderTable(this.node, this.airportData);
      const flightsTable = new FlightsTable(this.node, this.flightData);
    })();
  }

  async getFlightsForTable() {
    let flightData = await this.flightsModel.fetchFlightData();
    this.flightData = flightData;
  }

  async getAirportsForTable() {
    let airportData = await this.flightsModel.fetchAirportsData();
    this.airportData = airportData;
    console.log('airportData : ', this.airportData);
  }
}
