import createElement from "../../assets/lib/create-element.js"

export default class StepSlider {
  #steps = 0
  elem = null

  constructor({ steps, value = 0 }) {
    this.#steps = steps
    this.elem = createElement(this.#template())
    this.#addListeners()
    this.#makeStepActive(value)
  }

  #template() {
    return `
    <div class="slider">
    <div class="slider__thumb">
      <span class="slider__value slider__step-active">0</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
     ${this.#templateSteps().join('')}
    </div>
  </div>`
  }

  #templateSteps() {
    const stepsArr = []
    for (let i = 0; i < this.#steps; i++) {
      stepsArr.push(i)
    }
  return stepsArr.map((item) => `<span></span>`)
  }


  #addListeners() {
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left
      let leftRelative = left / this.elem.offsetWidth
      let approximateValue = leftRelative * (this.#steps - 1)
      let value = Math.round(approximateValue)
      this.#makeStepActive(value)
    })
  }

  #makeStepActive(value) {
    const previousActiveValue = this.elem.querySelector('.slider__step-active');
    if (previousActiveValue) {
      previousActiveValue.classList.remove('slider__step-active')
    }

    this.elem.querySelector('.slider__value').textContent = value
    const activeElem = this.elem.querySelectorAll('.slider__steps span')[value]
    activeElem.classList.add('slider__step-active')

    const valuePercents = value / (this.#steps - 1) * 100;
    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;

    const event = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    })
    this.elem.dispatchEvent(event)
  }
}
