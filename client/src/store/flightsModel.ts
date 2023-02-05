import Signal from '../utils/signal';
import { IFlightInfo } from '../utils/interfaces';
import TransfromOffer from './transformOffer';

// interface IOffer {
//   flights?: IFlight[] | [];
//   // flight: string;
//   // depTime: Date;
//   // arrTime: Date;
//   // segmentId: number;
//   isCombined: boolean;
//   charter: boolean;
//   price: string;
//   // duration: string;
// }

// interface IFlight {
//   flight: string;
//   depTime: Date;
//   arrTime: Date;
//   segmentId: number;
//   duration: string;
// }

export class FlightsModel {
  public flightsInfoData: IFlightInfo[] | [] | TransfromOffer[];
  public airports: unknown[] | [];
  public airlines: unknown[] | [];
  public onFilterAiports: Signal<{ choice: string; status: boolean }> =
    new Signal<{ choice: string; status: boolean }>();
  public onFilterAirlines: Signal<{ choice: string; status: boolean }> =
    new Signal<{ choice: string; status: boolean }>();
  public onOver: Signal<string> = new Signal<string>();

  constructor() {
    this.airports = [];
    this.airlines = [];
    this.flightsInfoData = [];
  }

  getflightsData() {
    return this.flightsInfoData;
  }

  async fetchFlightData() {
    try {
      let response: IFlightInfo[] = await (
        await fetch('http://localhost:8080/offers')
      ).json();

      this.flightsInfoData = [...response].map((f) => new TransfromOffer(f));

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

      return this.airlines;
    } catch (error) {
      console.error(error);
    }
  }
}
