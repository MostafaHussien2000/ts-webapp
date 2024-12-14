export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
};

export class OrderLine {
  constructor(public product: Product, public quantity: number) {}

  get total(): number {
    return this.product.price * this.quantity;
  }
}

export class Order {
  private readonly lines: Map<number, OrderLine>;

  constructor(initialLines?: OrderLine[]) {
    this.lines = new Map<number, OrderLine>();
    if (initialLines) {
      initialLines.forEach((line) => this.lines.set(line.product.id, line));
    }
  }

  public addProduct(prod: Product, quantity: number): void {
    if (this.lines.has(prod.id)) {
      if (quantity === 0) {
        this.removeProduct(prod.id);
      } else {
        const line = this.lines.get(prod.id);
        if (line) {
          line.quantity += quantity;
        }
      }
    } else {
      this.lines.set(prod.id, new OrderLine(prod, quantity));
    }
  }

  public removeProduct(productId: number): void {
    this.lines.delete(productId);
  }

  get orderLines(): OrderLine[] {
    return Array.from(this.lines.values());
  }

  get productCount(): number {
    return this.orderLines.reduce((total, line) => total + line.quantity, 0);
  }

  /**
   * Calculates the total price of all order lines in the order.
   * @returns The sum of the total prices of each order line.
   */
  get total(): number {
    return this.orderLines.reduce((total, line) => total + line.total, 0);
  }
}
