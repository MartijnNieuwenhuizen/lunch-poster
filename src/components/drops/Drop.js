export default class Drop {
  constructor(element, options) {
    this._element = element
    this._options = options

    this.startX = 0
    this.startY = 0
    this._lastY = 0
    this._x = this.startX
    this._y = this.startY
    this._play = this._play.bind(this)
    this._body = document.querySelector('body')

    this._addObserver()
  }

  _play() {
    this._element.style.transform = `translate(${this._x}px, ${this._y}px)`
  }

  _addObserver() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-drops'
        ) {
          mutation.target.dataset.drops === 'true'
            ? this._moveDropAside()
            : this._moveDropBack()
        }
      })
    })

    observer.observe(this._body, {
      attributes: true //configure it to listen to attribute changes
    })
  }

  _moveDropAside() {
    const { y, height } = this._element.getBoundingClientRect()

    const newY =
      Math.floor((y / window.innerHeight) * 100) > 50
        ? window.innerHeight - y - height / 2
        : -y - height / 2

    this._lastY = this._y
    this._y = newY
    this._play()
  }

  _moveDropBack() {
    this._y = this._lastY
    this._play()
  }
}
