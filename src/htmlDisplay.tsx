import { createElement } from "./tools/jsxFactory";
import { Product, Order } from "./data/entities";

import { AbstractSourceData } from "./data/abstractDataSource";
import { ProductList } from "./ProductList";

export class HTMLDisplay {
  private containerELement: HTMLElement;
  private selectedCategory: string;

  constructor() {
    this.containerELement = document.createElement("div");
  }

  props: {
    dataSource: AbstractSourceData;
  };

  async getContent(): Promise<HTMLElement> {
    await this.updateContent();
    return this.containerELement;
  }

  updateContent = async (): Promise<void> => {
    let products = await this.props.dataSource.getProducts(
      "id",
      this.selectedCategory
    );
    let categories = await this.props.dataSource.getCategories();

    this.containerELement.innerHTML = "";

    let content = (
      <div>
        <ProductList
          products={products}
          categories={categories}
          addToOrderCallback={this.addToOrder}
          filterCallback={this.selectCategory}
          selectedCategory={this.selectedCategory}
        />
      </div>
    );

    this.containerELement.appendChild(content);
  };

  addToOrder = (prod: Product, quantity: number): void => {
    this.props.dataSource.order.addProduct(prod, quantity);
    this.updateContent();
  };

  selectCategory = (cat: string): void => {
    this.selectedCategory = cat === "All" ? undefined : cat;
    this.updateContent();
  };
}
