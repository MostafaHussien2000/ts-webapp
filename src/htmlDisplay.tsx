import { createElement } from "./tools/jsxFactory";
import { Product, Order } from "./data/entities";

export class HTMLDisplay {
  props!: {
    products: Product[];
    order: Order;
  }

  getContent(): HTMLElement {
    return (
      <h3 className={"bg-secondary text-center text-white p-2"}>
        {this.getElementText()}
      </h3>
    );
  }

  getElementText(): string {
    return (
      `${this.props.products.length} Products, ` +
      `Order Total: $${this.props.order.total.toFixed(2)}`
    );
  }
}