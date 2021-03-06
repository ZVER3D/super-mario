import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { Vec2 } from '../math';

export class PlayerController extends Trait {
  player: Entity | null = null;
  checkPoint = new Vec2(0, 0);
  time = 300;
  score = 0;

  constructor() {
    super('playerController');
  }

  setPlayer(entity: Entity) {
    this.player = entity;

    this.player.stomper.onStomp = () => {
      this.score += 100;
    };
  }

  update(entity: Entity, deltaTime: number, level: Level) {
    if (level.entities.has(this.player!)) {
      this.time -= deltaTime * 2; // cause original mario had it faster
      if (this.time < 0) {
        // TODO: restart level
      }
      return;
    }
    this.player!.killable.revive();
    this.player!.pos.set(this.checkPoint.x, this.checkPoint.y);
    level.entities.add(this.player!);
  }
}
