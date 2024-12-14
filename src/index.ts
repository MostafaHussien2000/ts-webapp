import { LocalDataSource } from "./data/localDataSource";
import { HTMLDisplay } from "./htmlDisplay";

import "bootstrap/dist/css/bootstrap.min.css";

let ds = new LocalDataSource();

async function displayData(): Promise<HTMLElement> {
  let display = new HTMLDisplay();
  display.props = {
    dataSource: ds
  };
  return display.getContent();
}

document.onreadystatechange = () => {
  if (document.readyState === "complete")
    displayData().then((el) => {
      let rootElement = document.getElementById("app");
      if (rootElement == null)
        throw new Error("No root element found");

      rootElement.innerHTML = "";
      rootElement.appendChild(el);
    });
};
