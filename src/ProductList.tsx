import { createElement } from "./tools/jsxFactory";
import { Product } from "./data/entities";
import { CategoryList } from "./CategoryList";
import { ProductItem } from "./ProductItem";
import { addClass } from "./decorators";

export class ProductList {
  props: {
    products: Product[];
    categories: string[];
    selectedCategory: string;
    addToOrderCallback?: (prod: Product, quantity: number) => void;
    filterCallback?: (category: string) => void;
  };

  @addClass("select", "bg-info", "m-1")
  getContent(): HTMLElement {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-2">
            <CategoryList
              categories={this.props.categories}
              callback={this.props.filterCallback}
              selectedCategory={this.props.selectedCategory}
            />
          </div>
          <div className="col-9 p-2">
            {this.props.products.map((prod) => (
              <ProductItem
                product={prod}
                callback={this.props.addToOrderCallback}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
