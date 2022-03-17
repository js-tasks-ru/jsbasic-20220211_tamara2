import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #slides = []
  #carouselArrowRight = null
  #carouselArrowLeft = null
  #currentSlideIndex = null
  #container = null
  elem = null


  constructor(slides) {
    this.#slides = slides;
    this.elem = createElement(this.#template())
    this.#carouselArrowRight = this.elem.querySelector('.carousel__arrow_right')
    this.#carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left')
    this.#container = this.elem.querySelector('.carousel__inner')
    this.#currentSlideIndex = 0
    this.#initCarousel()
    this.#addListener()
  }

  #template() {
    return (`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
  
      <div class="carousel__inner">
      ${this.#templateSlides()}
      </div>
    </div>
      `)
  }

  #templateSlides() {
    return this.#slides.map(({name, price, image, id}) => (
      `
      <div class="carousel__slide" data-id=${id}>
      <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${price.toFixed(2)}</span>
        <div class="carousel__title">${name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
      `
    )).join('')
  }

  #initCarousel() {
    this.#setArrowStyle()
    this.#carouselArrowRight.addEventListener('click', () => this.#onArrowClick(true))
    this.#carouselArrowLeft.addEventListener('click', () => this.#onArrowClick(false))
  }

  #onArrowClick(toRight) {
    this.#currentSlideIndex = toRight ? this.#currentSlideIndex + 1 : this.#currentSlideIndex - 1
    this.#container.style.transform = `translateX(-${this.#container.offsetWidth * this.#currentSlideIndex}px)`
    this.#setArrowStyle()
  }

  #setArrowStyle() {
    this.#carouselArrowLeft.style.display = this.#currentSlideIndex === 0 ? 'none' : ''
    this.#carouselArrowRight.style.display = this.#currentSlideIndex === this.#slides.length - 1 ? 'none' : ''
  }

  #addListener() {
    const buttons = this.elem.querySelectorAll('.carousel__button')
    buttons.forEach(button => addEventListener('click', (event) => {
      const slide = event.target.closest('.carousel__slide');
      if (!slide) {
        return;
      }
      const customEvent = new CustomEvent('product-add', {
        detail: slide.dataset.id,
        bubbles: true
      })
      button.dispatchEvent(customEvent)
    }))
  }
  
}
