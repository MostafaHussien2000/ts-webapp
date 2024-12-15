import { Product, Order } from "./entities";

import { addProductSlug, minValue } from "../decorators";

export type ProductProp = keyof Product;

export abstract class AbstractSourceData {
  protected _products: Product[];
  protected _categories: Set<string>;
  public order: Order;
  public loading: Promise<void>;

  constructor() {
    this._products = [];
    this._categories = new Set<string>();
    this.order = new Order();
    this.loading = this.getData();
  }

  @minValue("price", 30)
  @addProductSlug
  async getProducts(
    sortProp: ProductProp = "id",
    category?: string
  ): Promise<Product[]> {
    await this.loading;
    return this.selectProducts(this._products, sortProp, category);
  }

  protected async getData(): Promise<void> {
    this._products = [];
    this._categories.clear();
    const rawData = await this.loadProducts();
    rawData.forEach((prod) => {
      this._products.push(prod);
      this._categories.add(prod.category);
    });
  }

  protected selectProducts(
    prods: Product[],
    sortProp: ProductProp,
    category?: string
  ): Product[] {
    return prods
      .filter((prod) => category === undefined || prod.category === category)
      .sort((prod1, prod2) =>
        prod1[sortProp] < prod2[sortProp]
          ? -1
          : prod1[sortProp] > prod2[sortProp]
          ? 1
          : 0
      );
  }

  async getCategories(): Promise<string[]> {
    await this.loading;
    return Array.from(this._categories.values());
  }

  protected abstract loadProducts(): Promise<Product[]>;
  abstract storeOrder(): Promise<number>;
}
