function initCarousel() {
  var carouselArrowRight = document.querySelector('.carousel__arrow_right')
  var carouselArrowLeft = document.querySelector('.carousel__arrow_left')

  var container = document.querySelector('.carousel__inner')
  var offsetWidth = container.offsetWidth
  var slides = Array.from(document.querySelectorAll('.carousel__slide'))
  var currentSlideIndex = 0

  const setArrowStyle = () => {
    carouselArrowLeft.style.display = currentSlideIndex === 0 ? 'none' : ''
    carouselArrowRight.style.display = currentSlideIndex === slides.length - 1 ? 'none' : ''
  }

  setArrowStyle()

  carouselArrowRight.addEventListener('click', (event) => {
    currentSlideIndex += 1
    container.style.transform = `translateX(-${offsetWidth * currentSlideIndex}px)`
    setArrowStyle()
  })

  carouselArrowLeft.addEventListener('click', () => {
    currentSlideIndex -= 1
    container.style.transform = `translateX(-${offsetWidth * currentSlideIndex}px)`
    setArrowStyle()
  })
}
