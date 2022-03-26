import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #categories = []
  #arrowRight = null
  #arrowLeft = null
  #ribbon = null
  #activeElem = null
  elem = null

  constructor(categories) {
    this.#categories = categories;
    this.elem = createElement(this.#template())
    this.#arrowRight = this.elem.querySelector('.ribbon__arrow_right')
    this.#arrowLeft = this.elem.querySelector('.ribbon__arrow_left')
    this.#ribbon = this.elem.querySelector('.ribbon__inner')
    this.#activeElem = this.elem.querySelectorAll('.ribbon__item')[0]
    this.#activeElem.classList.add('ribbon__item_active')
    this.#setArrowStyle()
    this.#addListeners()
    this.#setActiveMenuItem()
  }

  #template() {
    return `
    <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
    ${this.#categories.map(({id, name}) => `<a href="#" class="ribbon__item" data-id=${id}>${name}</a>`).join('')}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `
  }

  #setActiveMenuItem() {
    const menuItems = this.elem.querySelectorAll('.ribbon__item')
    menuItems.forEach(menuItem => {
      menuItem.addEventListener('click', (event) => {
        this.#activeElem.classList.remove('ribbon__item_active')
        this.#activeElem = event.target

        this.#activeElem.classList.add('ribbon__item_active')
        
        const customEvent = new CustomEvent('ribbon-select', {
          detail: this.#activeElem.dataset.id,
          bubbles: true
        })
        menuItem.dispatchEvent(customEvent)
      })
    });
  }

  #addListeners() {
    this.#arrowRight.addEventListener('click', () => {
      this.#ribbon.scrollBy(350, 0)
    })
    this.#arrowLeft.addEventListener('click', () => {
      this.#ribbon.scrollBy(-350, 0)
    })
    this.#ribbon.addEventListener('scroll', () => {
      this.#setArrowStyle()
    })
  }

  #setArrowStyle() {
    const scrollLeft = this.#ribbon.scrollLeft
    const scrollWidth = this.#ribbon.scrollWidth;;
    const clientWidth = this.#ribbon.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth
    if (scrollLeft === 0) {
      this.#arrowLeft.classList.remove('ribbon__arrow_visible')
    } else if (scrollRight < 1) {
      this.#arrowRight.classList.remove('ribbon__arrow_visible')
      this.#arrowLeft.classList.add('ribbon__arrow_visible')
    } else {
      this.#arrowLeft.classList.add('ribbon__arrow_visible')
      this.#arrowRight.classList.add('ribbon__arrow_visible')
    }
  }
}
