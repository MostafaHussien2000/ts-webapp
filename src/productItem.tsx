import { createElement } from "./tools/jsxFactory";
import { Product } from "./data/entities";

export class ProductItem {
    private _quantity: number = 1;

    props: {
        product: Product;
        callbakc: (product: Product, quantity: number) => void;
    };

    getContent(): HTMLElement {
        return (
            <div className="card m-1 p-1 bg-light">
                <h4>
                    {this.props.product.name}
                    <span className="badge badge-pill badge-primary float-right">
                        ${this.props.product.price.toFixed(2)}
                    </span>
                </h4>
                <div className="card-text">
                    {this.props.product.description}
                    <button className="btn btn-primary"
                        onClick={this.handleAddToCart}
                    >
                        Add To Cart
                    </button>
                    <select className="form-control-inline float-right m-1"
                        onchange={this.handleQuantityChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
            </div>
        )
    }

    handleAddToCart = (): void => {
        this.props.callbakc(this.props.product, this._quantity);

    }

    handleQuantityChange = (e: Event) => {
        this._quantity = Number((e.target as HTMLSelectElement).value);
    }
}