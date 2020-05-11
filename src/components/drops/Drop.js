export default class Drop {
  constructor(element, options) {
    this._element = element
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

    this._play()
    this._addObserver()
  }

  _play() {
    this._element.style.transform = `translate(${this._x}px, ${this._y}px)`
    // this._element.style.transform = `translate(${this._y}px, ${this._x}px)`

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

    requestAnimationFrame(this._play)
  }

  _addObserver() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          this._moveDropAside()
        }
      })
    })

    observer.observe(this._body, {
      attributes: true //configure it to listen to attribute changes
    })
  }

  _moveDropAside() {
    const { y, x, height } = this._element.getBoundingClientRect()
    console.log(
      'Math.floor((y / window.innerHeight) * 100): ',
      Math.floor((y / window.innerHeight) * 100)
    )
    const newY =
      Math.floor((y / window.innerHeight) * 100) > 50
        ? window.innerHeight - y - height / 2
        : -y - height / 2

    // const newY = y

    this._y = newY
    this._play()
  }
}
