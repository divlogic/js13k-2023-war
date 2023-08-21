import { Sprite } from 'kontra'
import SpriteState from './SpriteState'
// import { createAsteroid } from './main'

export function detectCollisions(sprites: SpriteState) {
  for (let i = 0; i < sprites.length(); i++) {
    if (sprites.get(i).type === 'asteroid') {
      for (let j = 0; j < sprites.length(); j++) {
        if (
          sprites.get(j).type !== 'asteroid' &&
          sprites.get(j).type !== 'character'
        ) {
          let asteroid = sprites.get(i)
          let sprite = sprites.get(j)
          let dx = asteroid.x - sprite.x
          let dy = asteroid.y - sprite.y
          const hyp = Math.hypot(dx, dy)
          if (hyp < asteroid.radius + sprite.radius) {
            asteroid.ttl = 0
            sprite.ttl = 0

            if (asteroid.radius > 10) {
              for (var x = 0; x < 3; x++) {
                // createAsteroid(asteroid.x, asteroid.y, asteroid.radius / 2.5)
              }
            }

            break
          }
        }
      }
    }
  }
}

export function handleBounds(sprite: Sprite, canvas: HTMLCanvasElement) {
  // sprite is beyond the left edge
  sprite.position.clamp(
    0,
    0,
    canvas.width - sprite.width,
    canvas.height - sprite.height
  )
  const radius: number = sprite.radius
  if (sprite.x < -radius) {
    sprite.x = canvas.width + radius
  } else if (sprite.x > canvas.width + radius) {
    // sprite is beyond the right edge
    // sprite.x = 0 - radius
  }
  // sprite is beyond the top edge
  if (sprite.y < -radius) {
    sprite.y = canvas.height + radius
  } else if (sprite.y > canvas.height + radius) {
    // sprite is beyond the bottom edge
    sprite.y = -radius
  }
  sprite.update()
}
