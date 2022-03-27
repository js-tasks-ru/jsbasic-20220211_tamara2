import createElement from "../../assets/lib/create-element.js"

export default class StepSlider {
  #steps = null
  #isDragging = false
  #sliderPosition = 0
  #value = 0
  elem = null

  constructor({ steps, value = 0 }) {
    this.#steps = steps
    this.#value = value
    this.elem = createElement(this.#template())
    this.#addListeners()
    this.#addSliderStyles(this.#sliderPosition)
    this.#makeStepActive(this.#value)
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
    this.elem.ondragstart = () => false

    const sliderThumb = this.elem.querySelector('.slider__thumb')
    sliderThumb.addEventListener('pointerdown', (event) => {
      event.preventDefault()
      this.#isDragging = true
      this.elem.classList.add('slider_dragging')
    })

    this.elem.addEventListener('click', (event) => {
      this.#calcValue(event)
      this.#makeStepActive()
      this.#addSliderStyles(this.#value / (this.#steps - 1) * 100)
      console.log(this.#isDragging)
      this.#dispatchCustomEvent()
    })

    document.addEventListener('pointermove', (event) => {
      event.preventDefault()
      if (!this.#isDragging) {
        return
      }
      this.#calcValue(event)
      this.#makeStepActive()
      this.#addSliderStyles(this.#sliderPosition * 100)
    })

    document.addEventListener('pointerup', () => {
      if (!this.#isDragging) {
        return
      }
      this.#isDragging = false
      this.elem.classList.remove('slider_dragging')
      this.#addSliderStyles(this.#value / (this.#steps - 1) * 100)
      this.#dispatchCustomEvent()
    })
  }

  #calcValue(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left
    this.#sliderPosition = left / this.elem.offsetWidth
    if (this.#sliderPosition < 0) {
      this.#sliderPosition = 0
    }
    
    if (this.#sliderPosition > 1) {
      this.#sliderPosition = 1
    }
    let approximateValue = this.#sliderPosition * (this.#steps - 1)
    this.#value = Math.round(approximateValue)
  }

  #makeStepActive() {
    const previousActiveValue = this.elem.querySelector('.slider__step-active');
    if (previousActiveValue) {
      previousActiveValue.classList.remove('slider__step-active')
    }

    this.elem.querySelector('.slider__value').textContent = this.#value
    const activeElem = this.elem.querySelectorAll('.slider__steps span')[this.#value]
    activeElem.classList.add('slider__step-active')
  }

  #addSliderStyles(percent) {
      let thumb = this.elem.querySelector('.slider__thumb')
      let progress = this.elem.querySelector('.slider__progress')
      thumb.style.left = `${percent}%`
      progress.style.width = `${percent}%`
  }

  #dispatchCustomEvent() {
    const event = new CustomEvent('slider-change', {
      detail: this.#value,
      bubbles: true
    })
    this.elem.dispatchEvent(event)
  }

}
