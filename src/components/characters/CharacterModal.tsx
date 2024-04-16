import Modal from "@mui/material/Modal";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { fetchCharacter } from "../../api/fetchCharacters";
import EmptyResult from "../EmptyResult";
import CharacterStatusIndicator from "./CharacterStatusIndicator";

interface CharacterModalProps {
  characterId: number | string;
  open: boolean;
  onClose: () => void;
}

const CharacterModal: FC<CharacterModalProps> = ({
  open,
  onClose,
  characterId,
}) => {
  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["character", characterId],
    queryFn: () => fetchCharacter(characterId),
  });

  if (!data) return <EmptyResult />;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="w-1/2 h-auto md:h-2/5 flex flex-col md:flex-row bg-gray-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg">
        <div className="w-full md:w-3/5 h-full">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-fill rounded-lg"
          />
        </div>
        <div className="h-1/4 w-full p-4 flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-slate-800">{data.name}</h1>
          <p className="text-lg text-slate-700 flex flex-row items-center">
            <CharacterStatusIndicator status={data.status} />
            {data.status} - {data.species}
          </p>
          <p className="flex flex-col gap-1">
            <span className="italic text-slate-600">Gender</span>
            <span className="text-slate-800 text-lg">{data.gender}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="italic text-slate-600">Origin</span>
            <span className="text-slate-800 text-lg">{data.origin.name}</span>
          </p>
          <p className="flex flex-col gap-1">
            <span className="italic text-slate-600">
              Number of episodes appeared
            </span>
            <span className="text-slate-800 text-lg">
              {data.episode.length}
            </span>
          </p>
        </div>
        {isFetching && (
          <p className="text-2xl font-bold text-slate-700 text-center">
            Loading...
          </p>
        )}
        {isError && (
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold text-slate-700">Error</h1>
            <p className="text-lg text-slate-700">{error?.message}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CharacterModal;
