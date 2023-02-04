import { Core } from './utils/core';

export default class FareDetailCell extends Core<HTMLElement> {
  constructor(parent: HTMLElement, fareDetail: string) {
    super(parent, 'div', 'fare-detail-cell', `${fareDetail}`);
  }
}
