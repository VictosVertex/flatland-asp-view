import { CellType, UnitType } from '@flasp/app/_core/types';
import { TileType } from '@flasp/app/_core/types';

const TILE_TYPE_TO_SVG_RECORD: Record<TileType, string> = {
  [CellType.STRAIGHT]: '/svg/straight.svg',
  [CellType.SIMPLE_SWITCH]: '/svg/simple_switch.svg',
  [CellType.DIAMOND_CROSSING]: '/svg/diamond_crossing.svg',
  [CellType.SINGLE_SLIP]: '/svg/single_slip.svg',
  [CellType.DOUBLE_SLIP]: '/svg/double_slip.svg',
  [CellType.SYMMETRICAL]: '/svg/symmetrical.svg',
  [CellType.DEAD_END]: '/svg/dead_end.svg',
  [CellType.TURN_RIGHT]: '/svg/right_turn.svg',
  [CellType.SIMPLE_SWITCH_MIRRORED]: '/svg/simple_switch_mirrored.svg',
  [UnitType.STATION]: '/svg/station.svg',
  [UnitType.AGENT]: '',
};

export default TILE_TYPE_TO_SVG_RECORD;
