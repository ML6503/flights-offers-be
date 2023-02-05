import { Core } from './utils/core';
import Row from './row';
import TransfromOffer from './store/transformOffer';

export default class FlightsTable extends Core<HTMLDivElement> {
  private readonly row: Core<HTMLElement>;
  private readonly heading: Core<HTMLElement>;
  private tableHeader: Core<HTMLElement>;
  private readonly fareDetail: Core<HTMLElement>;
  flightsData: TransfromOffer[] | [];

  constructor(parent: HTMLElement, flightsData: TransfromOffer[]) {
    super(parent, 'div', 'flights-table', '');
    this.flightsData = [...flightsData];

    this.heading = new Core(this.node, 'h2', 'flight-table-heading', 'Offers:');
    this.tableHeader = new Core(this.node, 'div', 'table-header');
    const tableHeaderDetails = [
      'Origin',
      'Destination',
      'Flight',
      'Dep. Time',
      'Arr. Time',
      'Duration',
      'Return',
      'Combined',
      'Charter',
      'Price',
    ];
    tableHeaderDetails.map(
      (h) =>
        new Core(this.tableHeader.node, 'div', 'table-header-detail', `${h}`)
    );

    for (let i = 0; i < flightsData.length; i++) {
      new Row(this.node, flightsData[i]);
    }
  }
}
