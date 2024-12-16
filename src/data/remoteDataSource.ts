import { AbstractSourceData } from "./abstractDataSource";
import { Product } from "./entities";
import Axios from "axios";

const PROTOCOL = "http",
  HOSTNAME = "localhost",
  PORT = 4600;

const baseURL = `${PROTOCOL}://${HOSTNAME}:${PORT}`;

const URLs = {
  products: `${baseURL}/products`,
  orders: `${baseURL}/orders`,
};

export class RemoteDataSource extends AbstractSourceData {
  async loadProducts(): Promise<Product[]> {
    const { data } = await Axios.get(URLs.products);
    return data;
  }

  async storeOrder(): Promise<number> {
    if (Array.from(this.order.orderLines.values()).length === 0)
      throw new Error("You can't place an empty order.");

    let orderData = {
      lines: Array.from(this.order.orderLines.values()).map((line) => ({
        productId: line.product.id,
        productName: line.product.name,
        quantity: line.quantity,
      })),
    };

    const { data } = await Axios.post(URLs.orders, orderData);

    return data.id;
  }
}
