import { IRes } from '../common/interfaces';
import { Matrix } from './math';

export class TileResolver {
  constructor(
    private readonly matrix: Matrix,
    public readonly tileSize: number = 16
  ) {}

  toIndex(pos: number) {
    return Math.floor(pos / this.tileSize);
  }

  private toIndexRange(pos1: number, pos2: number) {
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    const range: number[] = [];
    let pos = pos1;
    do {
      range.push(this.toIndex(pos));
      pos += this.tileSize;
    } while (pos < pMax);

    return range;
  }

  public getByIndex(indexX: number, indexY: number) {
    const tile = this.matrix.get(indexX, indexY);
    if (!tile) return;

    const y1 = indexY * this.tileSize;
    const y2 = y1 + this.tileSize;
    const x1 = indexX * this.tileSize;
    const x2 = x1 + this.tileSize;

    return { tile, y1, y2, x1, x2 } as IRes;
  }

  searchByPosition(posX: number, posY: number) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
  }

  searchByRange(x1: number, x2: number, y1: number, y2: number) {
    const matches: IRes[] = [];
    this.toIndexRange(x1, x2).forEach(indexX => {
      this.toIndexRange(y1, y2).forEach(indexY => {
        const match = this.getByIndex(indexX, indexY);
        if (match) {
          matches.push(match);
        }
      });
    });

    return matches;
  }
}
