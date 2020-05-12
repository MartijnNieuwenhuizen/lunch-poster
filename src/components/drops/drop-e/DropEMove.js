export default class DropEMove {
  constructor(element, options) {
    this._element = element.querySelector('svg')
    this._options = options

    const offset = 0.7

    this.startX = 0
    this.startY = 0
    this._x = this.startX
    this._y = this.startY
    this._movementMax = 50
    this._dx = Math.random() - offset
    this._dy = Math.random() - offset
    this._play = this._play.bind(this)
    this._body = document.querySelector('body')
    this._grow = 1

    this._addObserver()
  }

  _play() {
    this._element.style.transform = `translate(${this._x}px, ${this._y}px) scale(${this._grow})`

    if (
      this._x > this.startX + this._movementMax ||
      this._x < this.startX - this._movementMax
    ) {
      this._dx = -this._dx
    }

    if (
      this._y > this.startY + this._movementMax ||
      this._y < this.startY - this._movementMax
    ) {
      this._dy = -this._dy
    }

    this._x += this._dx
    this._y += this._dy
  }

  _addObserver() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          (mutation.target.dataset.largeViewEnvelope === 'true' ||
            mutation.target.dataset.showQuestion === 'true')
        ) {
          this._growDrop()
        }
      })
    })

    observer.observe(this._body, {
      attributes: true //configure it to listen to attribute changes
    })
  }

  _growDrop() {
    this._grow = 5
    this._play()
  }
}
