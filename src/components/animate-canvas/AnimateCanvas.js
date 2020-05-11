const isEvenNumber = value => value % 2 === 0

function Particle(
  ctx,
  x,
  y,
  width,
  height,
  dx,
  dy,
  rotation,
  dRotation,
  color
) {
  this._ctx = ctx
  this._x = x
  this._y = y
  this._width = width
  this._height = height
  this._dx = dx
  this._dy = dy
  this._rotation = rotation
  this._dRotation = dRotation
  this._color = color

  this.draw = function() {
    this._ctx.fillStyle = this._color
    this._ctx.fillRect(this._x, this._y, this._width, this._height)
    // this._ctx.rotate(this._rotation, this._rotation)
    // this._ctx.translate(this._rotation, this._rotation)
  }

  this.update = function() {
    // Dont leave the horizontal sides
    if (this._x > window.innerWidth || this._x < 0) {
      this._dx = -this._dx
    }

    // Dont leave the vertical sides
    if (this._y > window.innerHeight || this._y < 0) {
      this._dy = -this._dy
    }

    if (this._dRotation > 10 || this._dRotation > 10) {
      this._dRotation = -this._dRotation
    }

    this._x += this._dx
    this._y += this._dy
    this._rotation += this._dRotation
    this.draw()
  }
}

export default class AnimateCanvas {
  constructor(element) {
    this._canvas = element

    this._animate = this._animate.bind(this)

    this._particleWidth = 20
    this._particleHeight = 8
    this._particles = []

    this._maxParticles = 200

    this._initializeCanvas()
    this._initializeParticles()
  }

  _initializeCanvas() {
    this._canvas.width = window.innerWidth
    this._canvas.height = window.innerHeight
    this._ctx = this._canvas.getContext('2d')
    this._ctx.globalCompositeOperation = 'destination-over'
  }

  _initializeParticles() {
    for (let index = 0; index < this._maxParticles; index++) {
      const color = isEvenNumber(index) ? '#FF504B' : '#FBDA50'

      // const x = Math.random() * window.innerWidth
      // const y = Math.random() * window.innerHeight
      const x = 0
      const y = (window.innerHeight / 3) * 2
      const dx = (Math.random() - 0.5) * 100
      const dy = (Math.random() - 0.5) * 30
      const rotation = (20 * Math.PI) / 180
      const dRotation = 1

      const particle = new Particle(
        this._ctx,
        x,
        y,
        this._particleWidth,
        this._particleHeight,
        dx,
        dy,
        rotation,
        dRotation,
        color
      )
      this._particles.push(particle)
    }
    this._animate()
  }

  // // Loop animate function
  _animate() {
    // Remove old rects from screen
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)

    this._particles.forEach(particle => particle.update())

    requestAnimationFrame(this._animate)
  }
}
