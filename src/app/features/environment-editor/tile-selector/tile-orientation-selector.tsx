import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Orientation, TileType } from '@flasp/app/_core/types';
import TILE_TYPE_TO_SVG_RECORD from '@flasp/app/_core/utils/tile-to-svg';
import TileButton from './tile-button';

interface TileOrientationSelectorProps {
  tileType: TileType;
  numberOfOrientations: number;
  onChange: (orientation: number) => void;
}

interface TileOrientationSelectorMethods {
  getOrientation: () => Orientation;
}

const TileOrientationSelector = forwardRef<
  TileOrientationSelectorMethods,
  TileOrientationSelectorProps
>((props: TileOrientationSelectorProps, ref) => {
  const { tileType, numberOfOrientations, onChange } = props;

  const [orientation, setOrientation] = useState<Orientation>(
    Orientation.NORTH,
  );
  const onSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newOrientation: Orientation = parseInt(e.target.value, 10);
      setOrientation(newOrientation);
      onChange(newOrientation);
    },
    [onChange, setOrientation],
  );

  const increaseOrientation = useCallback(() => {
    const newOrientation: Orientation =
      (orientation + 1) % numberOfOrientations;
    setOrientation(newOrientation);
    onChange(newOrientation);
  }, [orientation, setOrientation, onChange, numberOfOrientations]);

  const decreaseOrientation = useCallback(() => {
    const newOrientation: Orientation =
      (orientation + 3) % numberOfOrientations;
    setOrientation(newOrientation);
    onChange(newOrientation);
  }, [orientation, setOrientation, onChange, numberOfOrientations]);

  /**
   * Reset necessary parameters if tile type changes
   */
  useEffect(() => {
    setOrientation(Orientation.NORTH);
  }, [tileType]);

  const getOrientation = () => orientation;

  useImperativeHandle(ref, () => ({ getOrientation }));

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'r') {
        increaseOrientation();
      }

      if (event.key === 'R') {
        decreaseOrientation();
      }
    },
    [increaseOrientation, decreaseOrientation],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ul className="mx-auto mt-5 flex justify-center gap-2">
      {Array.from({ length: numberOfOrientations }, (_, index) => (
        <li key={index}>
          <TileButton
            id={`tile-orientation-button-${index}`}
            value={index}
            svgString={TILE_TYPE_TO_SVG_RECORD[tileType]}
            groupName="tile-orientation-selection"
            onChange={onSelect}
            tileWidth={30}
            tileRotation={90 * index}
            isChecked={index === (orientation as number)}
          />
        </li>
      ))}
    </ul>
  );
});

TileOrientationSelector.displayName = 'TileOrientationSelector';

export default TileOrientationSelector;
export type { TileOrientationSelectorMethods };
