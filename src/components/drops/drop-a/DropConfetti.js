import confetti from 'canvas-confetti'

export default class DropConfetti {
  constructor(element) {
    this._element = element

    this._element.addEventListener('click', DropConfetti._spray)
  }

  static _spray(event) {
    const x = event.screenX / window.innerWidth
    const y = event.screenY / window.innerHeight

    confetti({
      particleCount: 300,
      spread: 80,
      origin: { x, y },
      angle: Math.floor(Math.random() * 359) + 1
    })
  }
}
