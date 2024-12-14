import { createElement } from "./tools/jsxFactory";
import { Product } from "./data/entities";
import { CategoryList } from "./CategoryList";
import { ProductItem } from "./ProductItem";

export class ProductList {
  props: {
    products: Product[];
    categories: string[];
    selectedCategory: string;
    addToOrder: (prod: Product, quantity: number) => void;
    filterByCategory: (cat: string) => void;
  };

  getContent(): HTMLElement {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-2">
            <CategoryList
              categories={this.props.categories}
              callback={this.props.filterByCategory}
              selectedCategory={this.props.selectedCategory}
            />
          </div>
          <div className="col-9 p-2">
            {this.props.products.map((prod) => (
              <ProductItem product={prod} callback={this.props.addToOrder} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
