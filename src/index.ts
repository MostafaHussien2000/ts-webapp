import { LocalDataSource } from "./data/localDataSource";

async function displayData(): Promise<string> {
  let ds = new LocalDataSource();

  let allProducts = await ds.getProducts("name");
  let categories = await ds.getCategories();
  let chessProducts = await ds.getProducts("name", "Chess");

  let result = "";

  allProducts.forEach(
    (prod) =>
      (result += `Product Name: ${prod.name}\t Category: ${prod.category}\n`)
  );

  categories.forEach((cat) => (result += `Category: ${cat}\n`));

  chessProducts.forEach((prod) => ds.order.addProduct(prod, 1));

  result += `Order Total: ${ds.order.total.toFixed(2)}`;

  return result;
}

displayData().then((data) => console.log(data));
