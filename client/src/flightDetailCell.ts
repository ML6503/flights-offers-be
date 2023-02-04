import { Core } from './utils/core';
import { IOfferFlight } from './utils/interfaces';

export default class FlightDetailCell extends Core<HTMLElement> {
  public flightDetails: IOfferFlight;
  private originCell: Core<HTMLDivElement>;
  private destinationCell: Core<HTMLDivElement>;
  private flightCell: Core<HTMLDivElement>;
  private depTimeCell: Core<HTMLDivElement>;
  private arrTimeCell: Core<HTMLDivElement>;
  private durationCell: Core<HTMLDivElement>;
  private returnCell: Core<HTMLDivElement>;

  constructor(parent: HTMLElement, flightDetails: IOfferFlight) {
    super(parent, 'div', 'flight-detail');
    this.flightDetails = flightDetails;
    let dateDep = flightDetails.depTime;
    let depH = dateDep.getHours();
    let depM = dateDep.getMinutes();

    let dateArr = flightDetails.arrTime;
    let arrH = dateArr.getHours();
    let arrM = dateArr.getMinutes();

    this.originCell = new Core(
      this.node,
      'div',
      'origin',
      `${flightDetails.origin}`
    );

    this.destinationCell = new Core(
      this.node,
      'div',
      'origin',
      `${flightDetails.destination}`
    );

    this.flightCell = new Core(
      this.node,
      'div',
      'flight-num',
      `${flightDetails.flight}`
    );
    this.depTimeCell = new Core(
      this.node,
      'div',
      'dep-time',
      `${depH}:${depM === 0 ? '00' : depM}`
    );
    this.arrTimeCell = new Core(
      this.node,
      'div',
      'dep-time',
      `${arrH}:${arrM === 0 ? '00' : arrM}`
    );

    this.durationCell = new Core(
      this.node,
      'div',
      'duration-cell',
      `${flightDetails.duration
        .split('')
        .map((l, i) => {
          if (i !== 0 && i !== 1) {
            return l;
          }
        })
        .join('')}`
    );

    this.returnCell = new Core(
      this.node,
      'div',
      'return-cell',
      `${flightDetails.segmentId === 0 ? 'one way' : 'return'}`
    );
  }
}
