import Signal from '../utils/signal';
import { IFlightInfo } from '../utils/interfaces';
import TransfromOffer from './transformOffer';

export class FlightsModel {
  public flightsInfoData: [] | TransfromOffer[];
  public airports: unknown[] | [];
  public airlines: unknown[] | [];
  public onFilterAiports: Signal<{ choice: string; status: boolean }> =
    new Signal<{ choice: string; status: boolean }>();
  public onFilterAirlines: Signal<{ choice: string; status: boolean }> =
    new Signal<{ choice: string; status: boolean }>();
  public onOver: Signal<string> = new Signal<string>();
  airlineState = 'ALL';
  airportState = 'ALL';
  private informer: string;

  constructor() {
    this.airports = [];
    this.airlines = [];
    this.flightsInfoData = [];
    this.informer = '';
  }

  getflightsData() {
    return this.flightsInfoData;
  }

  setflightsData(newData: [] | TransfromOffer[]) {
    this.flightsInfoData = newData;
  }

  async fetchFlightData() {
    try {
      let response: IFlightInfo[] = await (
        await fetch('http://localhost:8080/offers')
      ).json();
      await this.getPerformanceObersver('fetchFlightsData');
      this.flightsInfoData = [...response].map((f) => new TransfromOffer(f));
      await this.getPerformanceObersver('transformFlightsData');
      return this.flightsInfoData;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchAirportsData() {
    try {
      let response: unknown[] = await (
        await fetch('http://localhost:8080/airports')
      ).json();

      this.airports = [...response];
      await this.getPerformanceObersver('fetchAirportsData');
      return this.airports;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchAirlinesData() {
    try {
      let response: unknown[] = await (
        await fetch('http://localhost:8080/flights')
      ).json();

      this.airlines = [...response];
      await this.getPerformanceObersver('fetchAirlinesData');
      return this.airlines;
    } catch (error) {
      console.error(error);
    }
  }

  async getPerformanceObersver(funcName: string) {
    const observer = new PerformanceObserver((list) =>
      list.getEntries().forEach((entry) => {
        this.informer =
          'Name: ' +
          entry.name +
          ', Type: ' +
          entry.entryType +
          ', Start: ' +
          entry.startTime +
          ', Duration: ' +
          entry.duration +
          '\n';
        if (console) {
          console.info(
            'Name: ' +
              entry.name +
              ', Type: ' +
              entry.entryType +
              ', Start: ' +
              entry.startTime +
              ', Duration: ' +
              entry.duration +
              '\n'
          );
        }
      })
    );

    observer.observe({ entryTypes: ['measure', 'resource'] });

    performance.mark('registered-observer');
    return performance.measure(funcName);
    // const wrappedFetchFlights = performance.timerify(this.fetchFlightData);
    // await wrappedFetchFlights();

    // observer.disconnect();
  }

  getInformer() {
    return this.informer;
  }
}
