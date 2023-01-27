import { Core } from './utils/core';

export default class HeaderTable extends Core<HTMLDivElement> {
  constructor(parent: HTMLElement) {
    super(parent, 'div', 'header', '');
    // 2 filters
    // фильтр Аэропорты. Создать возможность фильтровать перелеты по этому списку.
    // фильтр Авиакомпании. Создать возможность фильтровать перелеты по этому списку.
  }
}
