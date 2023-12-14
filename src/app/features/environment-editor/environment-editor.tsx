import { useRef, useState, useCallback } from 'react';
import TileCanvas, {
  TileCanvasMethods,
} from '@flasp/app/_core/components/tile-canvas';
import { Orientation, TileType, UnitType } from '@flasp/app/_core/types';
import TileSelector from './tile-selector/tile-selector';
import EnvironmentEditorMenue from '@flasp/app/features/environment-editor/environment-editor-menue';

interface MapEditorProps {
  environmentWidth: number;
  environmentHeight: number;
}

function EnvironmentEditor(props: MapEditorProps) {
  const { environmentWidth, environmentHeight } = props;
  const [width, setWidth] = useState<number>(environmentWidth);
  const [height, setHeight] = useState<number>(environmentHeight);
  const canvasRef = useRef<TileCanvasMethods | null>(null);
  const [activeTileType, setActiveTileType] = useState<TileType | null>(null);
  const [activeOrientation, setActiveOrientation] =
    useState<Orientation | null>(null);
  // eslint-disable-next-line no-bitwise
  const cellWidth = ~~(630 / Math.max(width, height));

  const onClick = useCallback(
    (button: number, x: number, y: number) => {
      const canvas = canvasRef.current;
      if (canvas == null || activeTileType == null || activeOrientation == null)
        return;
      if (button === 1) {
        if (activeTileType === UnitType.STATION) {
          canvas.setTileAt(activeTileType, activeOrientation, x, y, 1);
        } else {
          canvas.setTileAt(activeTileType, activeOrientation, x, y, 0);
        }
      }

      if (button === 2) {
        canvas.removeTileAt(x, y);
      }
    },
    [activeTileType, activeOrientation],
  );

  const onSelectionChange = useCallback(
    (tileType: TileType, orientation: Orientation) => {
      setActiveTileType(tileType);
      setActiveOrientation(orientation);
    },
    [setActiveTileType, setActiveOrientation],
  );

  const saveEnvironment = useCallback(
    (name: string, numberOfAgents: number) => {
      if (canvasRef.current == null) return '';
      const layers = canvasRef.current.getLayers();
      const agents = Array.from(layers[1].values()).slice(0, numberOfAgents);
      const saveData = JSON.stringify({
        dimensions: {
          width,
          height,
        },
        cells: Array.from(layers[0].values()),
        stations: Array.from(layers[1].values()),
        agents,
      });

      fetch(`/api/environments/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': ' application/json',
        },
        body: saveData,
      })
        .then(() => {})
        .catch(() => {});
    },
    [width, height, canvasRef],
  );

  const resizeEnvironment = useCallback(
    (newWidth: number, newHeight: number) => {
      setWidth(newWidth);
      setHeight(newHeight);
    },
    [setWidth, setHeight],
  );

  return (
    <div
      className="mt-4 flex flex-grow justify-center gap-2"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex-row ">
        <div className="mb-16 flex h-[600px]">
          <div className="m-auto ">
            <TileCanvas
              ref={canvasRef}
              width={width}
              height={height}
              cellWidth={cellWidth}
              onClick={onClick}
            />
          </div>
        </div>
        <TileSelector onChange={onSelectionChange} />
      </div>
      <EnvironmentEditorMenue
        onResize={resizeEnvironment}
        onSave={saveEnvironment}
      />
    </div>
  );
}
export default EnvironmentEditor;
