import { FC, useState } from "react";
import CharacterModal from "./CharacterModal";
import CharacterStatusIndicator from "./CharacterStatusIndicator";

interface CharacterItemProps {
  character: any;
}

const CharacterItem: FC<CharacterItemProps> = ({ character }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-100 shadow-md rounded-lg  hover:cursor-pointer overflow-hidden">
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-full object-cover rounded-lg hover:scale-105 transition-all duration-300 ease-in-out "
        onClick={handleOpenModal}
      />
      <div className="flex flex-col gap-2 text-center py-3">
        <h1
          className="text-2xl font-bold text-slate-800"
          onClick={handleOpenModal}
        >
          {character.name}
        </h1>
        <p className="text-lg text-slate-700 flex flex-row items-center justify-center">
          <CharacterStatusIndicator status={character.status} />
          {character.status} - {character.species}
        </p>
      </div>
      {open && (
        <CharacterModal
          open={open}
          onClose={handleCloseModal}
          characterId={character.id}
        />
      )}
    </div>
  );
};

export default CharacterItem;
