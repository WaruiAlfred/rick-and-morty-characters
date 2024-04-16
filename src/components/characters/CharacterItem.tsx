import { FC } from "react";

interface CharacterItemProps {
  character: any;
}

const CharacterItem: FC<CharacterItemProps> = ({ character }) => {
  return (
    <div className="flex flex-col gap-2 bg-gray-100 shadow-md rounded-lg  hover:cursor-pointer overflow-hidden">
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-300 ease-in-out "
      />
      <div className="flex flex-col gap-2 text-center py-3">
        <h1 className="text-2xl font-bold text-slate-800">{character.name}</h1>
        <p className="text-lg text-slate-700 flex flex-row items-center justify-center">
          <span
            className={`w-2 h-2 rounded-full mr-1 ${
              character.status === "Alive"
                ? "bg-green-500"
                : character.status === "Dead"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          />
          {character.status} - {character.species}
        </p>
      </div>
    </div>
  );
};

export default CharacterItem;
