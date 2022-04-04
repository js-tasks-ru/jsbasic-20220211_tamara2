import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  #products = []
  #filters = null
  constructor(products) {
    this.#products = products;
    this.#filters = {};
    this.elem = createElement(this.#template())
    this.#updateGrid(this.#products)
  }

  #template() {
    return (
      `<div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>`
    )
  }

  updateFilter(newFilters) {
    this.#filters = { ...this.#filters, ...newFilters }
    const filtered = this.#products
      .filter(product => !product.nuts || !this.#filters.noNuts)
      .filter(product => product.vegeterian || !this.#filters.vegeterianOnly)
      .filter(product => product.spiciness <= this.#filters.maxSpiciness || !this.#filters.maxSpiciness)
      .filter(product => product.category === this.#filters.category || !this.#filters.category)
    this.#updateGrid(filtered)
  }

  #updateGrid(items) {
    let productsGridInner = this.elem.querySelector('.products-grid__inner');
    productsGridInner.innerHTML = ''
    for (let product of items) {
      productsGridInner.append(new ProductCard(product).elem)
    }
  }
}