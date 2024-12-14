import { createElement } from "./tools/jsxFactory";

export class CategoryList {
  props: {
    categories: string[];
    selectedCategory: string;
    callback: (selected: string) => void;
  };

  getContent(): HTMLElement {
    return (
      <div className="container">
        <div className="row">
          {["All", ...this.props.categories].map((c) =>
            this.getCategoryButton(c)
          )}
        </div>
      </div>
    );
  }

  getCategoryButton(cat?: string): HTMLElement {
    let selected =
      this.props.selectedCategory === undefined
        ? "All"
        : this.props.selectedCategory;

    let btnClass = selected === cat ? "btn-primary" : "btn-secondary";

    return (
      <button
        className={`btn btn-block ${btnClass} m-1`}
        onClick={() => this.props.callback(cat)}
      >
        {cat}
      </button>
    );
  }
}
