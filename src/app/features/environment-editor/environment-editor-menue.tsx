import { ChangeEvent, useCallback, useState } from 'react';

interface MapEditorMenueProps {
  onSave: (name: string, numberOfAgents: number) => void;
  onResize: (width: number, height: number) => void;
}

export default function EnvironmentEditorMenue(props: MapEditorMenueProps) {
  const [environmentName, setEnvironmentName] = useState<string>('');
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [numberOfAgents, setNumberOfAgents] = useState<number>(1);
  const { onSave, onResize } = props;

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnvironmentName(event.target.value);
  };
  const save = useCallback(() => {
    onSave(environmentName, numberOfAgents);
  }, [environmentName, numberOfAgents, onSave]);

  const onWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(event.target.value));
  };

  const onHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value));
  };

  const onNumberOfAgentsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfAgents(Number(event.target.value));
  };

  const resize = useCallback(() => {
    onResize(width, height);
  }, [width, height, onResize]);

  return (
    <div className="absolute right-36">
      <ul className="flex flex-col gap-4">
        <li>
          <input
            type="text"
            id="name"
            onChange={onNameChange}
            placeholder="Environment Name"
            className="border-b border-white bg-transparent px-4 py-2 focus:outline-none"
          />

          <button
            onClick={save}
            type="button"
            className="rounded bg-slate-700 px-4 py-2"
          >
            Save
          </button>
        </li>
        <li>Agents</li>
        <li>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={numberOfAgents}
            onChange={onNumberOfAgentsChange}
          />
          {numberOfAgents}
        </li>
        <li>Dimensions</li>
        <li>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={width}
            onChange={onWidthChange}
          />
          {width}
        </li>
        <li>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={height}
            onChange={onHeightChange}
          />
          {height}
        </li>
      </ul>

      <button
        onClick={resize}
        type="button"
        className="rounded bg-slate-700 px-4 py-2"
      >
        Resize
      </button>
    </div>
  );
}
