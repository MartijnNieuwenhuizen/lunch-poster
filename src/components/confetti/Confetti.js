import confetti from 'canvas-confetti'

export default class Confetti {
  constructor(element, options) {
    this._element = element
    this._options = options

    this._spray()
  }

  _spray() {
    confetti({
      particleCount: 300,
      spread: 80,
      origin: { y: 0.5 },
      angle: 0
    })
  }
}
