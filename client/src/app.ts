import './styles.css';
import { Core } from './utils/core';
import { FlightsModel } from './store/flightsModel';
import FlightsTable from './flightsTable';
import HeaderTable from './header';
import TransfromOffer from './store/transformOffer';
import Informer from './informer';
export class App extends Core<HTMLDivElement> {
  private flightsModel: FlightsModel;
  private header: HeaderTable;
  private flightData: [] | TransfromOffer[];
  private airportData: [] | unknown[];
  private airlinesData: [] | unknown[];
  private flightsTable: FlightsTable | null;
  private informer: Informer;

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
    this.informer && this.informer.destroy();
    // this.informer = new Informer(this.node, this.flightsModel.getInformer());
    this.informer = new Informer(
      this.node,
      this.flightsModel.getInformerEntries()
    );

    this.flightsTable = new FlightsTable(
      this.node,
      this.flightsModel.getflightsData()
    );
  }

  onFilterAirlinesChange = async (code: string) => {
    this.flightsModel.airlineState = code;

    if (
      code === 'ALL' ||
      (code === 'ALL' && this.flightsModel.airlineState === 'ALL')
    ) {
      await this.flightsModel.fetchFlightData();

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

        if (code !== 'ALL' && this.flightsModel.airportState !== 'ALL') {
          newFlights = newFlights.filter(
            (f) => f.origin === this.flightsModel.airportState
          );
        }

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

    if (
      code === 'ALL' ||
      (code === 'ALL' && this.flightsModel.airlineState === 'ALL')
    ) {
      await this.flightsModel.fetchFlightData();

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

        if (code !== 'ALL' && this.flightsModel.airlineState !== 'ALL') {
          // if (this.flightsModel.airlineState !== 'ALL') {
          newFlights = newFlights.filter(
            (f) => f.airline === this.flightsModel.airlineState
          );
        }

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
