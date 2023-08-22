import { Pool, Sprite, SpriteClass, pointerPressed } from 'kontra'
import SpriteState from './SpriteState'

export class Weapon extends SpriteClass {
  projectileWeapon?: boolean = false
  pool: Pool
  sprites: SpriteState

  constructor(properties: any) {
    console.log('Constructing weapon')
    super(properties)
    this.pool = properties.pool
    this.sprites = properties.sprites
    this.projectileWeapon = properties.projectileWeapon
  }
  attack(this: Weapon) {
    if (this.projectileWeapon) {
      const cos = Math.cos(this.world.rotation)
      const sin = Math.sin(this.world.rotation)
      const bullet = this.pool.get({
        team: this.parent.team,
        type: 'bullet',
        color: 'white',
        x: this.world.x + cos * 12,
        y: this.world.y + sin * 12,
        dx: this.dx + cos * 5,
        dy: this.dy + sin * 5,
        ttl: 200,
        radius: 2,
        width: 2,
        height: 2,
      })

      // I think calling this line will be highly dependent on
      // what kind of weapon it is, like sword vs projectile
      //   this.addChild(bullet)
      this.sprites.push(bullet as Sprite)
    }
  }
  update(dt?: number | undefined): void {
    super.update(dt)
    if (pointerPressed('left')) {
      this.attack()
    }
  }
}
