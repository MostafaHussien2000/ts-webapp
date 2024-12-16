import { createElement } from "./tools/jsxFactory";

export class Summary {
  props: {
    orderId: number;
    callback: () => void;
  };

  getContent(): HTMLElement {
    return (
      <div className="m-2 text-center">
        <h2>Thanks!</h2>
        <p>Thanks for placing your order.</p>
        <p>
          Your order id is{" "}
          <span className="badge badge-secondary">#{this.props.orderId}</span>
        </p>
        <p>We will ship your order as soon as possible.</p>
        <button
          className="btn btn-primary"
          type="button"
          onClick={this.props.callback}
        >
          Ok
        </button>
      </div>
    );
  }
}
