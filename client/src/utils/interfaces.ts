export interface IFlight {
  $: {
    code: string;
    fareName: string;
    num: string;
    origin: string;
    destination: string;
    depart: string; //date format "2017-09-28T18:20:00"
    arrive: string; //date format "017-09-29T09:10:00"
    leg: string;
    route: string;
    duration: string;
    durationMS: string;
    airplane: string;
    sys: string;
    systemAccessId: string;
    orderNum: string;
    segmentId: string; // "num"
    bookingClass: string;
    operatingCode: string;
    charterVariantId: string; // "num"
    places: string; // "num"
    placesCode: string;
    techStopCount: string; // "num"
    confirmed: boolean; // "false"
    sign: string;
  };
}

export interface IInfo {
  price: string;
  isCombined: boolean;
  validatorCode: string;
  tariff_adult: string;
  charter: boolean;
  isCharterSpecFare: boolean;
  directionType: string;
  number: string;
  hotelVaucher: boolean;
}

export interface IFlightInfo {
  $: IInfo;
  Flights: [{ Item: IFlight[] }];
}

export interface IOffer {
  flights?: IOfferFlight[] | [];
  // flight: string;
  // depTime: Date;
  // arrTime: Date;
  // segmentId: number;
  isCombined: boolean;
  charter: boolean;
  price: string;
  // duration: string;
}

export interface IOfferFlight {
  flight: string;
  depTime: Date;
  arrTime: Date;
  segmentId: number;
  duration: string;
  origin: string;
  destination: string;
  airline?: string;
}

export interface IOneFlight {
  flights?: IOfferFlight[] | [];
  flight: string;
  depTime: Date;
  arrTime: Date;
  segmentId: number;
  duration: string;
}
