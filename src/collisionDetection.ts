import { Sprite } from 'kontra'
import SpriteState from './SpriteState'
// import { createAsteroid } from './main'

export function detectCollisions(sprites: SpriteState) {
  sprites.forEach((sprite) => {
    const nearBySprites = sprites.quadTree.get(sprite)
    nearBySprites.forEach((neighbor) => {
      if (neighbor.type === 'character' && neighbor.team !== sprite.team) {
        let dx = neighbor.x - sprite.x
        let dy = neighbor.y - sprite.y
        const hyp = Math.hypot(dx, dy)
        if (hyp < sprite.radius + sprite.radius) {
          neighbor.ttl = 0
          sprite.ttl = 0
        }
      }
    })
  })
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
