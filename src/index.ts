import { LocalDataSource } from "./data/localDataSource";
import { DOMDisplay } from "./domDisplay";

import "bootstrap/dist/css/bootstrap.min.css";

let ds = new LocalDataSource();

async function displayData(): Promise<HTMLElement> {
  let display = new DOMDisplay();
  display.props = {
    products: await ds.getProducts("name"),
    order: ds.order,
  };

  return display.getContent();
}

document.onreadystatechange = () => {
  if (document.readyState === "complete")
    displayData().then((el) => {
      let rootElement = document.getElementById("app");
      rootElement.innerHTML = "";
      rootElement.appendChild(el);
    });
};
