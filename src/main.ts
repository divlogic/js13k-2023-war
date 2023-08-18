import kontra, { Sprite, init, GameLoop } from 'kontra';

const { canvas } = init();

kontra.initKeys();

const ship = Sprite({
  type: 'ship',
  x: 300,
  y: 300,
  radius: 6,
  dt: 0,
  render() {
    if (this.context != null) {
      this.context.strokeStyle = 'white';
      this.context.beginPath();
      this.context.moveTo(-3, -5);
      this.context.lineTo(12, 0);
      this.context.lineTo(-3, 5);
      this.context.closePath();
      this.context.stroke();
    }
  },
  update() {
    if (this.rotation != null) {
      if (kontra.keyPressed(['arrowleft', 'a'])) {
        this.rotation = this.rotation + kontra.degToRad(-4);
      } else if (kontra.keyPressed(['arrowright', 'd'])) {
        this.rotation = this.rotation + kontra.degToRad(4);
      }
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);

      if (kontra.keyPressed(['arrowkeyup', 'w'])) {
        this.ddx = cos * 0.05;
        this.ddy = sin * 0.05;
      } else if (kontra.keyPressed(['arrowkeydown', 's'])) {
        this.ddx = cos * -0.05;
        this.ddy = sin * -0.05;
      } else {
        this.ddx = 0;
        this.ddy = 0;
      }

      this.advance();
      if (this.velocity.length() > 5) {
        if (this.dx != null) this.dx *= 0.95;
        if (this.dy != null) this.dy *= 0.95;
      }
      this.dt = (this.dt as number) + 1 / 60;
      if (kontra.keyPressed('space') && this.dt > 0.25) {
        this.dt = 0;

        if (
          typeof this.x === 'number' &&
          typeof this.y === 'number' &&
          typeof this.dx === 'number' &&
          typeof this.dy === 'number'
        ) {
          const bullet = Sprite({
            type: 'bullet',
            color: 'white',
            x: this.x + cos * 12,
            y: this.y + sin * 12,
            dx: this.dx + cos * 5,
            dy: this.dy + sin * 5,
            ttl: 50,
            radius: 2,
            width: 2,
            height: 2,
          });

          sprites.push(bullet);
        }
      }
    }
  },
});

let sprites: Sprite[] = [];
sprites.push(ship);

function createAsteroid(x: number, y: number, radius: number): void {
  const asteroid = Sprite({
    type: 'asteroid',
    x,
    y,
    radius,
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,

    render() {
      if (this.context != null) {
        this.context.strokeStyle = 'white';
        this.context.beginPath();
        this.context.arc(0, 0, this.radius, 0, Math.PI * 2);
        this.context.stroke();
      }
    },
  });
  sprites.push(asteroid);
}

for (let i = 0; i < 4; i++) {
  createAsteroid(100, 100, 30);
}

const loop = GameLoop({
  update: function () {
    sprites.forEach((sprite) => {
      // sprite is beyond the left edge
      const radius: number = sprite.radius;
      if (sprite.x < -radius) {
        sprite.x = canvas.width + radius;
      } else if (sprite.x > canvas.width + radius) {
        // sprite is beyond the right edge
        sprite.x = 0 - radius;
      }
      // sprite is beyond the top edge
      if (sprite.y < -radius) {
        sprite.y = canvas.height + radius;
      } else if (sprite.y > canvas.height + radius) {
        // sprite is beyond the bottom edge
        sprite.y = -radius;
      }
      sprite.update();
    });

    // collision detection
    for (let i = 0; i < sprites.length; i++) {
      if (sprites[i].type === 'asteroid') {
        for (let j = 0; j < sprites.length; j++) {
          if (sprites[j].type !== 'asteroid') {
            let asteroid = sprites[i];
            let sprite = sprites[j];
            let dx = asteroid.x - sprite.y;
            let dy = asteroid.y - sprite.y;
            if (Math.hypot(dx, dy) < asteroid.radius + sprite.radius) {
              asteroid.ttl = 0;
              sprite.ttl = 0;

              if (asteroid.radius > 10) {
                for (var x = 0; x < 3; x++) {
                  createAsteroid(asteroid.x, asteroid.y, asteroid.radius / 2.5);
                }
              }

              break;
            }
          }
        }
      }
    }

    sprites = sprites.filter((sprite) => sprite.isAlive());
  },
  render: function () {
    sprites.forEach((sprite) => {
      sprite.render();
    });
  },
});

loop.start();
