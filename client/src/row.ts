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

    // console.log('row fare: ', fareDetails);
    this.flightsSection = new Core(this.node, 'div', 'flights-section');
    this.fareSection = new Core(this.node, 'div', 'fare-section');

    fareDetails.flights.map((f) => {
      new FlightDetailCell(this.flightsSection.node, f);
    });

    this.fareDetailCell = new FareDetailCell(
      this.fareSection.node,

      `${fareDetails.isCombined ? 'yes' : 'no'} `
    );

    this.fareDetailCell = new FareDetailCell(
      this.fareSection.node,

      `${fareDetails.charter ? 'yes' : 'no'}`
    );

    this.fareDetailCell = new FareDetailCell(
      this.fareSection.node,

      `${fareDetails.price}`
    );
  }
}
