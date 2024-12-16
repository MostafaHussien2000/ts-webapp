import { createElement } from "./tools/jsxFactory";
import { Product, Order } from "./data/entities";

import { AbstractSourceData } from "./data/abstractDataSource";

import { ProductList } from "./ProductList";
import { Header } from "./Header";
import { OrderDetails } from "./OrderDetails";
import { Summary } from "./Summary";

enum displayMode {
  List,
  Details,
  Complete,
}

export class HTMLDisplay {
  private containerELement: HTMLElement;
  private selectedCategory: string;

  private mode: displayMode = displayMode.List;
  private orderId: number;

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

    let content: HTMLElement;

    switch (this.mode) {
      case displayMode.List:
        content = this.getListContent(products, categories);
        break;
      case displayMode.Details:
        content = (
          <OrderDetails
            order={this.props.dataSource.order}
            cancelCallback={this.showList}
            submitCallback={this.submitOrder}
          />
        );
        break;
      case displayMode.Complete:
        content = <Summary orderId={this.orderId} callback={this.showList} />;
        break;
    }
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

  // Display Modes Methods
  getListContent = (products: Product[], categories: string[]): HTMLElement => {
    return (
      <div>
        <Header
          order={this.props.dataSource.order}
          submitCallback={this.showDetails}
        />
        <ProductList
          products={products}
          categories={categories}
          addToOrderCallback={this.addToOrder}
          filterCallback={this.selectCategory}
          selectedCategory={this.selectedCategory}
        />
      </div>
    );
  };

  showDetails = () => {
    this.mode = displayMode.Details;
    this.updateContent();
  };
  showList = () => {
    this.mode = displayMode.List;
    this.updateContent();
  };

  submitOrder = () => {
    this.props.dataSource
      .storeOrder()
      .then((id) => {
        this.orderId = id;
        this.props.dataSource.order = new Order();
        this.mode = displayMode.Complete;
        this.updateContent();
      })
      .catch((err: Error) => {
        console.error(err.message);
      });
  };
}
