import { Entity } from './Entity';
import { Matrix } from './math';
import { TileResolver } from './TileResolver';

export class TileCollider {
  tiles: TileResolver;

  constructor(tileMatrix: Matrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkX(entity: Entity) {
    let x;
    if (entity.vel.x > 0) {
      x = entity.bounds.right;
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.bounds.top,
      entity.bounds.bottom
    );
    matches.forEach(match => {
      if (match.tile.type !== 'ground') return;

      if (entity.vel.x > 0 && entity.bounds.right > match.x1) {
        entity.obstruct('right', match);
      } else if (entity.vel.x < 0 && entity.bounds.left < match.x2) {
        entity.obstruct('left', match);
      }
    });
  }

  checkY(entity: Entity) {
    let y;
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom;
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      entity.bounds.left,
      entity.bounds.right,
      y,
      y
    );
    matches.forEach(match => {
      if (match.tile.type !== 'ground') return;

      if (entity.vel.y > 0 && entity.bounds.bottom > match.y1) {
        entity.obstruct('bottom', match);
      } else if (entity.vel.y < 0 && entity.bounds.top < match.y2) {
        entity.obstruct('top', match);
      }
    });
  }
}
