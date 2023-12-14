import CellType from './cell-type';
import Unit from './unit';

type Cell = Unit & {
  type: CellType;
};

export default Cell;
