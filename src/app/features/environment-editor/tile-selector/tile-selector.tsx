import { useCallback, useRef, useState } from 'react';
import {
  Orientation,
  TileType,
  CellType,
  UnitType,
} from '@flasp/app/_core/types';
import tileTypeIsCellType from '@flasp/app/_core/utils/type-guards';
import TILE_TYPE_TO_SVG_RECORD from '@flasp/app/_core/utils/tile-to-svg';
import TileButton from './tile-button';
import TileOrientationSelector, {
  TileOrientationSelectorMethods,
} from './tile-orientation-selector';

const NumberOfOrientations: Record<TileType, number> = {
  [CellType.STRAIGHT]: 2,
  [CellType.SIMPLE_SWITCH]: 4,
  [CellType.DIAMOND_CROSSING]: 1,
  [CellType.SINGLE_SLIP]: 4,
  [CellType.DOUBLE_SLIP]: 2,
  [CellType.SYMMETRICAL]: 4,
  [CellType.DEAD_END]: 4,
  [CellType.TURN_RIGHT]: 4,
  [CellType.SIMPLE_SWITCH_MIRRORED]: 4,
  [UnitType.STATION]: 1,
  [UnitType.AGENT]: 4,
};

interface TileSelectorProps {
  onChange: (tileType: TileType, orientation: Orientation) => void;
}

function TileSelector(props: TileSelectorProps) {
  const { onChange } = props;
  const [selection, setSelection] = useState<TileType | null>(null);
  const orientationSelectorRef = useRef<TileOrientationSelectorMethods | null>(
    null,
  );
  const [showOrientationSelector, setShowOrientationSelector] =
    useState<boolean>(false);

  const onSelectionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const tileType: TileType = parseInt(e.target.value, 10) as TileType;
      setSelection(tileType);
      setShowOrientationSelector(NumberOfOrientations[tileType] !== 1);
      onChange(tileType, Orientation.NORTH);
    },
    [setSelection, setShowOrientationSelector, onChange],
  );

  const onOrientationChange = useCallback(
    (orientation: number) => {
      if (selection == null) return;
      onChange(selection, orientation);
    },
    [selection, onChange],
  );

  return (
    <div>
      <ul className="flex gap-2 text-white">
        {Object.keys(TILE_TYPE_TO_SVG_RECORD).map((key) => {
          const tileType = parseInt(key, 10) as TileType;

          if (tileType === UnitType.AGENT) return '';

          const typeName = tileTypeIsCellType(tileType)
            ? CellType[tileType]
            : UnitType[tileType];
          return (
            <li key={typeName}>
              <TileButton
                svgString={TILE_TYPE_TO_SVG_RECORD[tileType]}
                id={`${typeName}-tile-button`}
                value={tileType}
                groupName="tile-selection"
                onChange={onSelectionChange}
                isChecked={selection ? selection === tileType : false}
              />
            </li>
          );
        })}
      </ul>
      {showOrientationSelector && selection != null && (
        <TileOrientationSelector
          ref={orientationSelectorRef}
          tileType={selection}
          numberOfOrientations={NumberOfOrientations[selection]}
          onChange={onOrientationChange}
        />
      )}
    </div>
  );
}

export default TileSelector;
