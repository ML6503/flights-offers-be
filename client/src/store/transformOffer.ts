import { IFlight, IOfferFlight, IInfo } from '../utils/interfaces';

export default class TransfromOffer {
  public price: string;
  public flights: IOfferFlight[];
  public isCombined: boolean;
  public charter: boolean;

  constructor(offer: { $: IInfo; Flights: [{ Item: IFlight[] }] }) {
    this.price = offer.$.price;
    this.isCombined = offer.$.isCombined;
    this.charter = offer.$.charter;
    this.flights = this.toOfferFlights(offer.Flights[0].Item);
    this.returnOffer();
  }

  returnOffer() {
    let oneOffer = {
      price: this.price,
      isCombined: this.isCombined,
      charter: this.charter,
      flights: this.flights,
    };

    return oneOffer;
  }

  toOfferFlights(flights: IFlight[]) {
    let offerFlights = [...flights].map((f) => {
      return {
        ariline: f.$.code,
        origin: f.$.origin,
        destination: f.$.destination,
        // fullFlightInfo: f.$,
        flight: `${f.$.code}-${f.$.num}`,
        depTime: new Date(f.$.depart),
        arrTime: new Date(f.$.arrive),
        segmentId: +f.$.segmentId,
        duration: f.$.duration,
      };
    });
    return offerFlights;
  }
}
