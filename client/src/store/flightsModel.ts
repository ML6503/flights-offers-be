import Signal from '../utils/signal';

interface IFlight {
  $: {
    Code: string;
    FareName: boolean;
    Num: string;
    Origin: string;
    Depart: string; //date format "2017-09-28T18:20:00"
    Arrive: string; //date format "017-09-29T09:10:00"
    Leg: string;
    Duration: string;
    DurationMS: string;
    Airplane: string;
    Sys: string;
    SystemAccessId: string;
    OrderNum: string;
    SegmentId: string; // "num"
    BookingClass: string;
    OperatingCode: string;
    CharterVariantId: string; // "num"
    Places: string; // "num"
    PlacesCode: string;
    TechStopCount: string; // "num"
    Confirmed: boolean; // "false"
    Sign: string;
  };
}

interface IFlightInfo {
  $: {
    Price: string;
    IsCombined: boolean;
    ValidatorCode: string;
    tariff_adult: string;
    charter: boolean;
    IsCharterSpecFare: boolean;
    DirectionType: string;
    Number: string;
    HotelVaucher: boolean;
  };
  Flights: IFlight[];
}

export class FlightsModel {
  private flightsData: IFlightInfo[];
  private airports: string[] | [];
  private airlines: string[] | [];
  public onFilterAiports: Signal<{ choice: string; status: boolean }> =
    new Signal<{ choice: string; status: boolean }>();
  public onFilterAirlines: Signal<{ choice: string; status: boolean }> =
    new Signal<{ choice: string; status: boolean }>();
  public onOver: Signal<string> = new Signal<string>();

  constructor() {
    this.airports = [];
    this.airlines = [];
    this.flightsData = [];
    this.getFlightData();
  }

  async getFlightData() {
    try {
      let response = await fetch('http://localhost:8080/');
      this.flightsData.push(await response.json());
      console.log('FLIGHTS', this.flightsData);
      return this.flightsData;
    } catch (error) {
      console.error(error);
    }
  }
}
