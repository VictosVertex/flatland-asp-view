'use client';
import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import {
  Orientation,
  Tile,
  TileType,
  Position,
  Cell,
  Station,
  UnitType,
} from '@flasp/app/_core/types';
import tileTypeIsCellType, {
  tileIsCell,
} from '@flasp/app/_core/utils/type-guards';
import TILE_TYPE_TO_SVG_RECORD from '@flasp/app/_core/utils/tile-to-svg';

interface TileCanvasProps {
  width: number;
  height: number;
  cellWidth: number;
  onClick: (button: number, x: number, y: number) => void;
}

interface TileCanvasMethods {
  setTileAt: (
    tileType: TileType,
    orientation: Orientation,
    x: number,
    y: number,
    layerId: number,
  ) => void;
  removeTileAt: (x: number, y: number) => void;
  getLayers: () => CanvasLayer[];
}

type CanvasLayer = Map<number, Tile>;

const TileCanvas = forwardRef<TileCanvasMethods, TileCanvasProps>(
  (props: TileCanvasProps, ref) => {
    const { width, height, cellWidth, onClick } = props;
    const numberOfLayers = 3;
    const gridBorderWidth = 1;
    const editorCellWidth = cellWidth + gridBorderWidth;
    const scale = 1;

    const [layers, setLayers] = useState<CanvasLayer[]>(
      Array.from({ length: numberOfLayers }, () => new Map()),
    );
    const [currentPosition, setCurrentPosition] = useState<Position | null>(
      null,
    );

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(
      null,
    );
    /**
     * Handle mouse events, like calling the provided onClick callback
     */
    const onEvent = useCallback(
      (event: MouseEvent) => {
        if ((event.buttons !== 1 && event.buttons !== 2) || canvas == null)
          return;
        const x = event.clientX - canvas.offsetLeft;
        const y = event.clientY - canvas.offsetTop + window.scrollY;

        // eslint-disable-next-line no-bitwise
        const cellX = ~~(x / editorCellWidth / scale);
        // eslint-disable-next-line no-bitwise
        const cellY = ~~(y / editorCellWidth / scale);

        onClick(event.buttons, cellX, cellY);
      },
      [onClick, canvas, editorCellWidth],
    );

    /**
     * Draw the tile grid lines on the canvas
     */
    const drawGrid = useCallback(() => {
      if (context == null) return;
      context.beginPath();
      context.strokeStyle = 'grey';
      // vertical lines
      for (let i = 1; i < width; i += 1) {
        context.moveTo(i * editorCellWidth, 0);
        context.lineTo(i * editorCellWidth, height * editorCellWidth - 1);
      }

      // horizontal
      for (let i = 1; i < height; i += 1) {
        context.moveTo(0, i * editorCellWidth);
        context.lineTo(width * editorCellWidth - 1, i * editorCellWidth);
      }
      context.stroke();
    }, [context, editorCellWidth, height, width]);

    /**
     * Set up event listeners, get context and canvas
     */
    useEffect(() => {
      const currentCanvas = canvasRef.current;
      if (currentCanvas == null) return;

      const currentContext = currentCanvas.getContext('2d');
      if (currentContext == null) return;

      setCanvas(currentCanvas);
      setContext(currentContext);

      currentCanvas.addEventListener('mousemove', onEvent);
      currentCanvas.addEventListener('mousedown', onEvent);

      // eslint-disable-next-line consistent-return
      return () => {
        currentCanvas.removeEventListener('mousemove', onEvent);
        currentCanvas.removeEventListener('mousedown', onEvent);
      };
    }, [onEvent]);

    const singleValueFromPosition = useCallback(
      (position: Position) => {
        return position.y * width + position.x;
      },
      [width],
    );

    /**
     * Reset the canvas in case of a resize
     */
    useEffect(() => {
      setLayers(Array.from({ length: numberOfLayers }, () => new Map()));
      if (context == null) return;
      context.reset();
      drawGrid();
    }, [context, setLayers, drawGrid]);

    useEffect(drawGrid, [drawGrid]);

    const renderTile = useCallback(
      (tile: Tile) => {
        if (context == null) return;
        if (typeof window !== 'undefined') {
          const image = new Image(editorCellWidth - 1, editorCellWidth - 1);

          if (tileIsCell(tile)) {
            image.src = TILE_TYPE_TO_SVG_RECORD[tile.type];
          } else {
            image.src = TILE_TYPE_TO_SVG_RECORD[UnitType.STATION];
          }

          context.save();

          context.translate(
            (tile.position.x + 1) * editorCellWidth - editorCellWidth / 2,
            (tile.position.y + 1) * editorCellWidth - editorCellWidth / 2,
          );
          context.rotate((tile.orientation * Math.PI) / 2);
          context.drawImage(
            image,
            -editorCellWidth / 2,
            -editorCellWidth / 2,
            editorCellWidth - 1,
            editorCellWidth - 1,
          );
          context.restore();
        }
      },
      [context, editorCellWidth],
    );

    const renderTileStack = useCallback(
      (position: Position) => {
        if (context == null) return;
        context.clearRect(
          position.x * editorCellWidth + 1,
          position.y * editorCellWidth + 1,
          editorCellWidth - 2,
          editorCellWidth - 2,
        );
        layers.forEach((layer: CanvasLayer) => {
          if (layer.has(singleValueFromPosition(position))) {
            renderTile(layer.get(singleValueFromPosition(position))!);
          }
        });
      },
      [context, renderTile, layers, editorCellWidth, singleValueFromPosition],
    );

    const renderLayer = useCallback(
      (layer: CanvasLayer) => {
        layer.forEach((tile: Tile) => {
          renderTile(tile);
        });
      },
      [renderTile],
    );
    const renderCanvas = useCallback(() => {
      if (context == null) return;
      context.reset();
      context.scale(scale, scale);
      drawGrid();

      layers.forEach((layer: CanvasLayer) => {
        renderLayer(layer);
      });
    }, [context, drawGrid, layers, renderLayer]);

    const setTileAt = useCallback(
      (
        tileType: TileType,
        orientation: Orientation,
        x: number,
        y: number,
        layerId: number,
      ) => {
        const position: Position = { x, y };

        let tile: Tile | null = null;

        if (tileTypeIsCellType(tileType)) {
          const cell: Cell = { type: tileType, position, orientation };
          tile = cell;
        } else {
          const station: Station = { position, orientation };
          tile = station;
        }
        const updatedLayers = [...layers];
        updatedLayers[layerId].set(singleValueFromPosition(position), tile);
        setLayers(updatedLayers);
        setCurrentPosition(position);
      },
      [layers, setLayers, singleValueFromPosition, setCurrentPosition],
    );

    const removeTileAt = useCallback(
      (x: number, y: number) => {
        const position: Position = { x, y };
        const updatedLayers = [...layers];
        for (let i = updatedLayers.length - 1; i >= 0; i -= 1) {
          if (updatedLayers[i].has(singleValueFromPosition(position))) {
            updatedLayers[i].delete(singleValueFromPosition(position));
            break;
          }
        }

        setLayers(updatedLayers);
        setCurrentPosition(position);
      },
      [layers, setLayers, singleValueFromPosition, setCurrentPosition],
    );

    useEffect(() => {
      if (currentPosition == null) return;
      renderTileStack(currentPosition);
    }, [layers, currentPosition, renderTileStack]);

    const getLayers = useCallback(() => layers, [layers]);

    useImperativeHandle(ref, () => ({ setTileAt, removeTileAt, getLayers }));

    return (
      <canvas
        ref={canvasRef}
        width={width * editorCellWidth - 1}
        height={height * editorCellWidth - 1}
        style={{ border: '1px solid black' }}
      >
        Your browser does not support the canvas element.
      </canvas>
    );
  },
);

TileCanvas.displayName = 'TileCanvas';

export default TileCanvas;
export type { TileCanvasMethods };
