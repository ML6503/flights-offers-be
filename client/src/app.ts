import './styles.css';
import { Core } from './utils/core';
import { FlightsModel } from './store/flightsModel';
import FlightsTable from './flightsTable';
import HeaderTable from './header';
import { IFlightInfo } from './utils/interfaces';
import TransfromOffer from './store/transformOffer';
export class App extends Core<HTMLDivElement> {
  private flightsModel: FlightsModel;
  private header: HeaderTable;
  private flightData: [] | TransfromOffer[];
  private airportData: [] | unknown[];
  private airlinesData: [] | unknown[];
  private flightsTable: FlightsTable | null;

  constructor(parent: HTMLElement) {
    super(parent, 'div', 'app', '');
    // let response = async () => await (await fetch('http://localhost:8080/')).json();
    // this.flightsData.push(await response.json());
    this.flightsModel = new FlightsModel();
    this.flightsTable;
    // let flightData = this.flightsModel.getflightsData();
    this.flightData = [];
    this.airportData = [];
    this.airlinesData = [];

    (async () => {
      await this.getFlightsForTable();
      await this.getAirportsForTable();
      await this.getAirlinesForTable();
      this.header = new HeaderTable(
        this.node,
        this.airlinesData,
        this.airportData,
        this.flightsModel.onFilterAiports,
        this.flightsModel.onFilterAirlines,
        this.onFilterAirlinesChange
      );
      this.updateFlightsTable();
    })();
  }

  async getFlightsForTable() {
    let flightData = await this.flightsModel.fetchFlightData();
    this.flightData = flightData;
  }

  async getAirportsForTable() {
    let airportData = await this.flightsModel.fetchAirportsData();
    this.airportData = airportData;
    // console.log('airportData : ', this.airportData);
  }

  async getAirlinesForTable() {
    let airlinesData = await this.flightsModel.fetchAirlinesData();
    this.airlinesData = airlinesData;
    // console.log('airLinesData : ', this.airlinesData);
  }

  updateFlightsTable() {
    this.flightsTable && this.flightsTable.destroy();
    this.flightsTable = new FlightsTable(this.node, this.flightData);

    return this.flightsTable;
  }

  onFilterAirlinesChange = async (code: string) => {
    const flightsInfo = await this.flightsModel.fetchFlightData();
    const resultedFlights = [];
    for (let i = 0; i < flightsInfo.length; i++) {
      let oneFlight = flightsInfo[i];
      let newFlights = [...oneFlight.flights].filter((f) => f.airline === code);

      oneFlight.flights = newFlights;
      if (oneFlight.flights.length > 0) {
        resultedFlights.push(oneFlight);
      }
    }
    this.flightData = resultedFlights;
    this.updateFlightsTable();
  };

  getFlightData() {
    return this.flightData;
  }
}
