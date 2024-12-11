import { Product, Order } from "./data/entities";

export class DOMDisplay {
  props: {
    products: Product[];
    order: Order;
  };

  getContent(): HTMLElement {
    let el = document.createElement("h3");
    el.innerText = this.getElementText();
    el.classList.add("bg-primary", "text-center", "text-white", "p-2");
    return el;
  }

  getElementText() {
    return (
      `${this.props.products.length} Products, ` +
      `Order Total: ${this.props.order.total.toFixed(2)}`
    );
  }
}
