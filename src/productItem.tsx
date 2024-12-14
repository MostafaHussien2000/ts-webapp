import { createElement } from "./tools/jsxFactory";
import { Product } from "./data/entities";

export class ProductItem {
  private _quantity: number = 1;

  props: {
    product: Product;
    callback?: (product: Product, quantity: number) => void;
  };

  getContent(): HTMLElement {
    return (
      <div className="card m-1 p-4 bg-light">
        <h4 className="d-flex justify-content-between">
          {this.props.product.name}
          <span className="badge rounded-pill bg-primary fs-6 fw-normal">
            ${this.props.product.price.toFixed(2)}
          </span>
        </h4>
        <div className="card-text bg-white p-2">
          {/* Product Description */}
          {this.props.product.description}

          {/* Add To Cart - Button */}
          <button
            type="button"
            className="btn btn-success btn-sm float-end"
            onClick={this.handleAddToCart}
          >
            Add to cart
          </button>

          {/* HTML Select Element */}
          <select
            name="quantity"
            title="select quantity"
            className="form-control-inline float-end m-1 mx-3"
            onChange={this.handleQuantityChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
      </div>
    );
  }

  handleAddToCart = (): void => {
    if (this.props.callback) {
      this.props.callback(this.props.product, this._quantity);
    }
  };

  handleQuantityChange =  (e: Event) => {
    this._quantity = Number((e.target as HTMLSelectElement).value);
  };
}
