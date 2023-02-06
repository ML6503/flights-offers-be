import { Core } from './utils/core';

export default class Informer extends Core {
  private readonly infoHeading: Core;
  private readonly infoSpan: Core;
  private infoEntriesWrapper: Core;

  // constructor(parent: HTMLElement, informerData: string) {
  constructor(parent: HTMLElement, informerEntries: string[]) {
    super(parent, 'div', 'info-wrapper');

    this.infoHeading = new Core(
      this.node,
      'h4',
      'informer-heading',
      'Performance Observer: '
    );
    // this.infoSpan = new Core(this.node, 'span', 'informer', informerData);
    this.infoEntriesWrapper = new Core(
      this.node,
      'div',
      'informer-entries-wrapper'
    );
    informerEntries.map(
      (info) => new Core(this.infoEntriesWrapper.node, 'span', 'informer', info)
    );
  }
}
