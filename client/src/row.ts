import { Core } from '././utils/core';
import { IOffer } from './utils/interfaces';
import FlightDetailCell from './flightDetailCell';
import FareDetailCell from './fareDetailCell';
export default class Row extends Core<HTMLElement> {
  private fareDetailCell: FareDetailCell;
  private flightsSection: Core<HTMLElement>;
  private fareSection: Core<HTMLElement>;
  private flightDetailCell: FlightDetailCell;

  constructor(parent: HTMLElement, fareDetails: IOffer) {
    super(parent, 'div', 'flight-row');
    // console.log('', fareDetails.Flights[0].Item);
    console.log('row fare: ', fareDetails);
    this.flightsSection = new Core(this.el, 'div', 'flights-section');
    this.fareSection = new Core(this.el, 'div', 'fare-section');

    fareDetails.flights.map((f) => {
      new FlightDetailCell(this.flightsSection.el, f);
    });

    this.fareDetailCell = new FareDetailCell(
      this.fareSection.el,

      `${fareDetails.isCombined ? 'yes' : 'no'} `
    );

    this.fareDetailCell = new FareDetailCell(
      this.fareSection.el,

      `${fareDetails.charter ? 'yes' : 'no'}`
    );

    this.fareDetailCell = new FareDetailCell(
      this.fareSection.el,

      `${fareDetails.price}`
    );
  }
}
