import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modal = null
  constructor() {
    this.#modal = createElement(this.#template)
  }

  #template() {
    return `
    <div class="modal">
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
        </h3>
      </div>

      <div class="modal__body">
      </div>
    </div>

  </div>
    `
  }

  setTitle(title) {
    if(this.#modal.querySelector('.modal__title')) {
      this.#modal.querySelector('.modal__title').textContent = title
    }
  }

  setBody(body) {
    const modalBody = this.#modal.querySelector('.modal__body')
    modalBody.innerHTML = ''
    modalBody.append(body)
  }

  open() {
    document.body.append(this.#modal)
    document.body.classList.add('is-modal-open')
    this.#addListeners()
  }

  close() {
    document.removeEventListener('keydown', this.#onKeyDown)
    document.body.classList.remove('is-modal-open')
    if (this.#modal) {
      this.#modal.remove()
    }
  }

  #addListeners() {
    const closeButton = document.querySelector('.modal__close')
    closeButton.addEventListener('click', () => {
      this.close()
    })
    document.addEventListener('keydown', this.#onKeyDown)
  }

  #onKeyDown = (event) => {
    if(event.code === 'Escape') {
      this.close()
    }
  }
}
