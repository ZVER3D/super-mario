import { Entity, Trait } from '../Entity';

export class Stomper extends Trait {
  bounceSpeed = 150;

  constructor() {
    super('stomper');
  }

  onStomp() {}

  bounce(us: Entity, them: Entity) {
    if (them.killable.dead) return;
    us.bounds.bottom = them.bounds.top;
    us.vel.y = -this.bounceSpeed;
    this.onStomp();
  }

  collides(us: Entity, them: Entity) {
    if (!them.killable || us.vel.y <= them.vel.y) return;
    this.bounce(us, them);
  }
}
