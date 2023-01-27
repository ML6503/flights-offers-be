import { Core } from './utils/core';
import { IFlightInfo } from './utils/interfaces';
import Row from './row';
import TransfromOffer from './store/transformOffer';

export default class FlightsTable extends Core<HTMLDivElement> {
  private row: Core<HTMLElement>;
  private heading: Core<HTMLElement>;
  private tableHeader: Core<HTMLElement>;
  private fareDetail: Core<HTMLElement>;
  flightData: IFlightInfo[];

  constructor(parent: HTMLElement, flightsData: any) {
    super(parent, 'div', 'flights-table', '');
    this.flightData = [...flightsData];
    // name Offers
    //table with each offer in row and following columns
    // 1 Код авиакомпании и номер рейса in UT-500 format
    //	2 время вылета и 3 время прилета
    // 4 Время в пути (используются атрибуты Duration или DurationMS);
    // 5 Если перелет в обе стороны, показать его в вышеуказанном формате
    // (используется атрибут SegmentId, который если 0, то перелет в одну сторону, 1 — перелет обратно);
    // 6. Указать, если перелет комбинированный (используется атрибут IsCombined);
    // 7.	Указать, если чартерный рейс (используется атрибут charter);
    // 8.	Итоговая цена оффера.
    this.heading = new Core(this.el, 'h2', 'flight-table-heading', 'Offers:');
    this.tableHeader = new Core(this.el, 'div', 'table-header');
    const tableHeaderDetails = [
      'Flight',
      'Departure Time',
      'Arrival Time',
      'Duration',
      'Return', // SegmentId,  ===1
      'Combined',
      'Charter',
      'Price',
    ];
    tableHeaderDetails.map(
      (h) => new Core(this.tableHeader.el, 'div', 'table-header-detail', `${h}`)
    );
    // console.log('flight data from table :', this.flightData);
    console.log(
      'transformer',
      new TransfromOffer({
        $: {
          price: '27840,69',
          isCombined: true,
          validatorCode: '',
          tariff_adult: '24150',
          charter: false,
          isCharterSpecFare: false,
          directionType: 'RUS',
          number: '0',
          hotelVaucher: false,
        },
        Flights: [
          {
            Item: [
              {
                $: {
                  code: 'N4',
                  fareName: 'TGOLF',
                  num: '305',
                  origin: 'SVO',
                  destination: 'KHV',
                  depart: '2017-09-28T18:20:00',
                  arrive: '2017-09-29T09:10:00',
                  leg: '28SEPMOWKHV',
                  route: '28SEPMOWKHV',
                  duration: 'PT7H50M',
                  durationMS: '28200000',
                  airplane: 'Airbus A330-300',
                  sys: '2',
                  systemAccessId: '10',
                  orderNum: '0',
                  segmentId: '0',
                  bookingClass: 'T',
                  operatingCode: 'N4',
                  charterVariantId: '0',
                  places: '9',
                  placesCode: 'T',
                  techStopCount: '0',
                  confirmed: false,
                  sign: 'B23BE9FDD0C93E52026395B40F363981SOotHWO0Q4j264OptzU++w==',
                },
              },
              {
                $: {
                  code: 'U6',
                  fareName: 'AECIW',
                  num: '674',
                  origin: 'KHV',
                  destination: 'IKT',
                  depart: '2017-10-12T07:35:00',
                  arrive: '2017-10-12T09:00:00',
                  leg: '12OCTKHVMOW',
                  route: '12OCTKHVMOW',
                  duration: 'PT3H25M',
                  durationMS: '12300000',
                  airplane: 'Airbus A320-100/200',
                  sys: '2',
                  systemAccessId: '10',
                  orderNum: '0',
                  segmentId: '1',
                  bookingClass: 'A',
                  operatingCode: 'U6',
                  charterVariantId: '0',
                  places: '4',
                  placesCode: 'A',
                  techStopCount: '0',
                  confirmed: false,
                  sign: '5F44EF1F22EB85ED25441A1E02F9A821h1dkxDWMJqL264OptzU++w==',
                },
              },
              {
                $: {
                  code: 'U6',
                  fareName: 'AECIW',
                  num: '106',
                  origin: 'IKT',
                  destination: 'DME',
                  depart: '2017-10-13T07:50:00',
                  arrive: '2017-10-13T09:00:00',
                  leg: '12OCTKHVMOW',
                  route: '12OCTKHVMOW',
                  duration: 'PT6H10M',
                  durationMS: '22200000',
                  airplane: 'Airbus A320-100/200',
                  sys: '2',
                  systemAccessId: '10',
                  orderNum: '1',
                  segmentId: '1',
                  bookingClass: 'A',
                  operatingCode: 'U6',
                  charterVariantId: '0',
                  places: '9',
                  placesCode: 'A',
                  techStopCount: '0',
                  confirmed: false,
                  sign: '4008240D12927744F9190C25FE873C3Ah1dkxDWMJqL264OptzU++w==',
                },
              },
            ],
          },
        ],
      })
    );
    console.log('tranfoemed raw data:', new TransfromOffer(flightsData[0]));
    for (let i = 0; i < flightsData.length; i++) {
      new Row(this.el, new TransfromOffer(flightsData[i]));
    }
  }
}
