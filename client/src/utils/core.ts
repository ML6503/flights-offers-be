export class Core<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(
    parent: HTMLElement,
    tag: keyof HTMLElementTagNameMap = 'div',
    className: string = '',
    content: string = ''
  ) {
    const el = document.createElement(tag);
    el.className = className;
    el.textContent = content;
    if (parent) {
      parent.append(el);
    }
    this.node = el as NodeType;
  }

  destroy() {
    this.node.remove();
  }
}
