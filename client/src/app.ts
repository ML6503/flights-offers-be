import './styles.css';
import { Core } from './utils/core';
import { FlightsModel } from './store/flightsModel';
import FlightsTable from './flightsTable';
import HeaderTable from './header';
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

    this.flightsModel = new FlightsModel();
    this.flightsTable;

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
        this.onFilterAirlinesChange,
        this.onFilterAirportsChange
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
  }

  async getAirlinesForTable() {
    let airlinesData = await this.flightsModel.fetchAirlinesData();
    this.airlinesData = airlinesData;
  }

  async updateFlightsTable() {
    this.flightsTable && this.flightsTable.destroy();
    console.log('weare in update table: ', this.flightsModel.getflightsData());
    this.flightsTable = new FlightsTable(
      this.node,
      this.flightsModel.getflightsData()
    );
  }

  onFilterAirlinesChange = async (code: string) => {
    this.flightsModel.airlineState = code;

    if (code === 'ALL') {
      await this.flightsModel.fetchFlightData();

      console.log('ALL ALL case: ', this.flightsModel.getflightsData());
      this.updateFlightsTable();
    } else {
      let resultedFlights = [];
      let result = await this.flightsModel.fetchFlightData();
      let flightsInfo = [...result];

      for (let i = 0; i < flightsInfo.length; i++) {
        let oneFlight = flightsInfo[i];
        let newFlights = [...oneFlight.flights].filter(
          (f) => f.airline === code
        );

        oneFlight.flights = newFlights;
        if (oneFlight.flights.length > 0) {
          resultedFlights.push(oneFlight);
        }
      }

      this.flightsModel.setflightsData(resultedFlights);
      this.updateFlightsTable();
    }
  };

  onFilterAirportsChange = async (code: string) => {
    this.flightsModel.airportState = code;

    if (code === 'ALL') {
      await this.flightsModel.fetchFlightData();

      console.log(
        'ALL ALL APR FLT - MODEL flights: ',
        this.flightsModel.getflightsData()
      );

      this.updateFlightsTable();
    } else {
      let resultedFlights = [];
      let result = await this.flightsModel.fetchFlightData();
      let flightsInfo = [...result];

      for (let i = 0; i < flightsInfo.length; i++) {
        let oneFlight = flightsInfo[i];

        let newFlights = [...oneFlight.flights].filter(
          (f) => f.origin === code
        );

        oneFlight.flights = newFlights;
        if (oneFlight.flights.length > 0) {
          resultedFlights.push(oneFlight);
        }
      }

      this.flightsModel.setflightsData(resultedFlights);
      this.updateFlightsTable();
    }
  };

  getFlightData() {
    return this.flightData;
  }
}
