import Signal from '../utils/signal';
import { IFlightInfo } from '../utils/interfaces';

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
  // public flightsInfoData: IFlightInfo[];
  public flightsInfoData: IFlightInfo[] | [];
  public airports: string[] | [];
  public airlines: string[] | [];
  public onFilterAiports: Signal<{ choice: string; status: boolean }> =
    new Signal<{ choice: string; status: boolean }>();
  public onFilterAirlines: Signal<{ choice: string; status: boolean }> =
    new Signal<{ choice: string; status: boolean }>();
  public onOver: Signal<string> = new Signal<string>();

  constructor() {
    this.airports = [];
    this.airlines = [];
    this.flightsInfoData = [];
    // this.fetchFlightData();
  }

  getflightsData() {
    return this.flightsInfoData;
  }

  async fetchFlightData() {
    try {
      let response: IFlightInfo[] = await (
        await fetch('http://localhost:8080/offers')
      ).json();
      // this.flightsData.push(await response.json());
      // const details: any[] = [];

      // let oneOffer: IOffer;
      // console.log('response', response);
      this.flightsInfoData = [...response];
      // console.log(' this.flightsInfoData ', this.flightsInfoData);
      // response.map((offer: any) => {
      //   oneOffer = {
      //     flights: [],
      //     isCombined: offer.$.isCombined,
      //     charter: offer.$.charter,
      //     price: offer.$.price,
      //   };

      //   // console.log('offer details: ', offer.Flights[0].Item);
      //   details.push(offer.Flights[0].Item);
      //   console.log('offer details: ', details);
      // });

      // // this.flightsInfoData.push(response);
      // // let oneFlight: IOffer;
      // let oneFlight: IOneFlight;
      // let flightsData: Array<IOffer | IFlight> | [] = [];

      // details.map((f: any) => {
      //   for (let i = 0; i < f.length; i++) {
      //     oneFlight = {
      //       flight: f[i].$.code + '-' + f[i].$.num,
      //       depTime: new Date(f[i].$.depart),
      //       arrTime: new Date(f[i].$.arrive),
      //       segmentId: f[i].$.segmentId,
      //       duration: f[i].$.duration,
      //     };
      //     // oneFlight.flight = f[i].$.code + '-' + f[i].$.num;
      //     // oneFlight.depTime = new Date(f[i].$.depart);
      //     // oneFlight.arrTime = new Date(f[i].$.arrive);
      //     // oneFlight.segmentId;
      //     // oneFlight.durationOW;
      //     // oneFlight.durationReturn;
      //     // console.log('one flight ', f[i].$.segmentId);
      //   }

      //   oneOffer.flights = [...oneOffer.flights, oneFlight];
      //   // console.log('One offer: ', oneOffer);
      //   flightsData = [...flightsData, oneOffer];
      //   this.flightsInfoData = flightsData;
      // });

      return this.flightsInfoData;
    } catch (error) {
      console.error(error);
    }
  }
}
