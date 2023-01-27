import { Core } from '././utils/core';
import { IOffer } from './utils/interfaces';
import FlightDetailCell from './flightDetailCell';

export default class Row extends Core<HTMLElement> {
  private fareDetailCell: Core<HTMLElement>;
  private flightsSection: Core<HTMLElement>;
  private fareSection: Core<HTMLElement>;
  private flightDetailCell: Core<HTMLElement>;

  constructor(parent: HTMLElement, fareDetails: IOffer) {
    super(parent, 'div', 'flight-row');
    // console.log('', fareDetails.Flights[0].Item);
    console.log('row fare: ', fareDetails);
    this.flightsSection = new Core(this.el, 'div', 'flights-section');
    this.fareSection = new Core(this.el, 'div', 'fare-section');

    fareDetails.flights.map((f) => {
      return new FlightDetailCell(this.flightsSection.el, f);
    });
    this.fareDetailCell = new Core(
      this.fareSection.el,
      'div',
      'fare-detail'
      // `${fareDetails.price}`
    );
  }
}
