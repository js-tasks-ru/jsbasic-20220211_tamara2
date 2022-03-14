function initCarousel() {
  const carouselArrowRight = document.querySelector('.carousel__arrow_right')
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left')

  const container = document.querySelector('.carousel__inner')
  const offsetWidth = container.offsetWidth
  const slides = Array.from(document.querySelectorAll('.carousel__slide'))
  let currentSlideIndex = 0

  setArrowStyle(carouselArrowLeft, carouselArrowRight, currentSlideIndex, slides.length)

  carouselArrowRight.addEventListener('click', (event) => {
    console.log(event.target.classList)
    currentSlideIndex += 1
    container.style.transform = `translateX(-${offsetWidth * currentSlideIndex}px)`
    setArrowStyle(carouselArrowLeft, carouselArrowRight, currentSlideIndex, slides.length)
  })

  carouselArrowLeft.addEventListener('click', () => {
    currentSlideIndex -= 1
    container.style.transform = `translateX(-${offsetWidth * currentSlideIndex}px)`
    setArrowStyle(carouselArrowLeft, carouselArrowRight, currentSlideIndex, slides.length)
  })
}

const setArrowStyle = (arrowLeft, arrowRight, currentSlideIndex, slidesCount) => {
  arrowLeft.style.display = currentSlideIndex === 0 ? 'none' : ''
  arrowRight.style.display = currentSlideIndex === slidesCount - 1 ? 'none' : ''
}
