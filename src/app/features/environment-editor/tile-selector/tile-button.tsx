import Image from 'next/image';

type TileButtonProps = {
  id: string;
  value: number;
  svgString: string;
  tileWidth?: number;
  tileRotation?: number;
  isChecked?: boolean;
  groupName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TileButton(props: TileButtonProps) {
  const {
    id,
    value,
    svgString,
    groupName,
    tileWidth = 40,
    tileRotation = 0,
    isChecked = false,
    onChange,
  } = props;

  return (
    <>
      <input
        type="radio"
        id={id}
        name={groupName}
        value={value}
        className="peer hidden"
        onChange={onChange}
        required
        checked={isChecked}
      />
      <label
        htmlFor={id}
        className={`inline-flex w-full cursor-pointer 
          items-center justify-between rounded-lg border 
          border-gray-600 p-2 text-gray-500 hover:bg-gray-700 
          hover:text-gray-300 peer-checked:border-blue-300
            `}
      >
        <div>
          <Image
            src={svgString}
            style={{
              rotate: `${tileRotation}deg`,
            }}
            width={tileWidth}
            height={tileWidth}
            alt=""
          />
        </div>
      </label>
    </>
  );
}
