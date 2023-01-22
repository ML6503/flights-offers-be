import { Core } from './common/core';
// import { RegForm } from "./common/reg";

export class App extends Core<HTMLDivElement> {
  constructor(parent: HTMLElement) {
    super(parent, 'div', 'font-sans text-lg italic', '');

    // const regForm = new RegForm(this.el);
  }
}
