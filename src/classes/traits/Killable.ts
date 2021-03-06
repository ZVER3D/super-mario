import { Entity, Trait } from '../Entity';
import { Level } from '../Level';

export class Killable extends Trait {
  dead = false;
  deadTime = 0;
  removeAfter = 2;

  constructor() {
    super('killable');
  }

  kill() {
    this.queue(() => (this.dead = true));
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  update(entity: Entity, deltaTime: number, level: Level) {
    if (!this.dead) {
      if (entity.pos.y > 22 * 16) {
        level.entities.delete(entity);
      }
      return;
    }
    this.deadTime += deltaTime;
    if (this.deadTime < this.removeAfter) return;
    level.entities.delete(entity);
  }
}
