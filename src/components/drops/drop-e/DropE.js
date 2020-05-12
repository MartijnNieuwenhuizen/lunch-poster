import confetti from 'canvas-confetti'

export default class DropE {
  constructor(element) {
    this._element = element

    this._handleClick = this._handleClick.bind(this)
    this._body = document.querySelector('body')

    this._element.addEventListener('click', this._handleClick)
  }

  _handleClick(event) {
    if (
      !this._body.dataset.showQuestion ||
      this._body.dataset.showQuestion === 'false'
    ) {
      this._body.setAttribute('data-show-question', 'true')
      this._body.setAttribute('data-large-view-envelope', 'false')
      DropE._spray(event)
    }
  }

  static _spray(event) {
    const x = event.screenX / window.innerWidth
    const y = event.screenY / window.innerHeight

    const defaultOptions = {
      particleCount: 300,
      spread: 80,
      angle: 0,
      origin: { x, y }
    }

    confetti({
      ...defaultOptions,
      angle: 0
    })
    confetti({
      ...defaultOptions,
      angle: 90
    })
    confetti({
      ...defaultOptions,
      angle: 180
    })
    confetti({
      ...defaultOptions,
      angle: 270
    })
  }
}
