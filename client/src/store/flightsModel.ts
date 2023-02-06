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
  private informerEntries: [] | string[];

  constructor() {
    this.airports = [];
    this.airlines = [];
    this.flightsInfoData = [];
    this.informer = '';
    this.informerEntries = [];
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

      this.flightsInfoData = [...response].map((f) => new TransfromOffer(f));
      await this.getPerformanceObersver('transformFlightsData');
      await this.getPerformanceObersver('fetchFlightsData');

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
          'Entry: ' +
          entry.name +
          // ', Type: ' +
          // entry.entryType +
          ', Start: ' +
          entry.startTime +
          ', Duration: ' +
          entry.duration +
          ' ms' +
          '\n';
        (this.informerEntries as string[]).push(this.informer);
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
  }

  getInformer() {
    return this.informer;
  }

  getInformerEntries() {
    return this.informerEntries;
  }
}
