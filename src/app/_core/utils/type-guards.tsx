import { TileType, CellType, Tile, Cell } from '@flasp/app/_core/types';

function tileTypeIsCellType(tileType: TileType): tileType is CellType {
  return Object.values(CellType).includes(tileType as CellType);
}

function tileIsCell(tile: Tile): tile is Cell {
  return Object.values(CellType).includes((tile as Cell).type);
}

export default tileTypeIsCellType;
export { tileIsCell };
