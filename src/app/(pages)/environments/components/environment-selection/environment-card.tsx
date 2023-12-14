interface EnvironmentCardProps {
  name: string;
  json: boolean;
  pkl: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EnvironmentCard(props: EnvironmentCardProps) {
  const { name, json, pkl, onChange } = props;

  return (
    <>
      <input
        type="radio"
        id={name}
        name="element-selection"
        value={name}
        className="peer hidden"
        onChange={onChange}
        required
      />
      <label
        htmlFor={name}
        className="mx-auto block w-[500px] cursor-pointer items-center rounded-lg border border-x-0 border-t-0 border-gray-600 p-5 text-gray-500 hover:text-gray-300 peer-checked:border-blue-300 peer-checked:text-white"
      >
        <div className="flex items-center gap-2">
          <h2 className=" text-xl">{name}</h2>
          <div className="ml-auto flex gap-3 ">
            <div>Json: {json ? `Y` : 'N'}</div> <div>Pkl:{pkl ? `Y` : 'N'}</div>
          </div>
        </div>
      </label>
    </>
  );
}
