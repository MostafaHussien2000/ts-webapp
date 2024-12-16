import { Order } from "./data/entities";
import { createElement } from "./tools/jsxFactory";

export class Header {
  props: {
    order: Order;
    submitCallback: () => void;
  };

  getContent(): HTMLElement {
    let count = this.props.order.productCount;
    return (
      <div className="p-1 text-white text-light bg-primary">
        {count === 0
          ? "(No Selection)"
          : `${count} product(s), $${this.props.order.total.toFixed(2)}`}
        <button
          className="btn btn-sm btn-primary bg-white text-primary m-1"
          onCLick={this.props.submitCallback}
        >
          Submit Order
        </button>
      </div>
    );
  }
}
