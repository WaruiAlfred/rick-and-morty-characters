import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import {
  fetchAllCharacters,
  fetchFilteredCharacters,
} from "../../api/fetchCharacters";
import CharacterItem from "./CharacterItem";
import CharactersHeader from "./CharactersHeader";

interface CharactersProps {}

const Characters: FC<CharactersProps> = () => {
  const [filterStatus, setFilterStatus] = useState<string>("");

  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchAllCharacters,
  });

  const {
    isFetching: isFilteredFetching,
    isError: isFilteredError,
    error: filteredError,
    data: filteredCharacters,
  } = useQuery({
    queryKey: ["filteredCharacters", filterStatus],
    queryFn: () => fetchFilteredCharacters(filterStatus),
  });

  if (isFetching || isFilteredFetching) {
    return (
      <div className="flex items-center justify-center gap-4">
        <p className="text-3xl font-bold text-slate-700">Loading...</p>
      </div>
    );
  }

  if (isError || isFilteredError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-slate-700">Error</h1>
        <p className="text-lg text-slate-700">
          {error?.message || filteredError?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 font-mono">
      {/* <ToastContainer /> */}
      <CharactersHeader
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 px-12">
        {data?.results?.length > 0 &&
        filteredCharacters?.results?.length === 0 ? (
          data.results.map((character: any) => (
            <CharacterItem key={character.id} character={character} />
          ))
        ) : filteredCharacters?.results?.length > 0 ? (
          filteredCharacters?.results.map((character: any) => (
            <CharacterItem key={character.id} character={character} />
          ))
        ) : data?.results?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold text-slate-700">
              No characters found
            </h1>

            <img
              src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
              alt="No characters found"
              className="w-1/2 h-1/2 object-cover rounded-lg"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Characters;
