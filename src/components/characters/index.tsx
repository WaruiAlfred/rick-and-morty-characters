import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import {
  fetchAllCharacters,
  fetchFilteredCharacters,
} from "../../api/fetchCharacters";
import EmptyResult from "../EmptyResult";
import CharacterItem from "./CharacterItem";
import CharactersHeader from "./CharactersHeader";

const Characters = () => {
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [page, setPage] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchAllCharacters(page),
  });

  const {
    isFetching: isFilteredFetching,
    isError: isFilteredError,
    error: filteredError,
    data: filteredCharacters,
  } = useQuery({
    queryKey: ["filteredCharacters", filterStatus, page],
    queryFn: () => fetchFilteredCharacters(filterStatus, page),
  });

  if (isFetching || isFilteredFetching) {
    return (
      <div className="flex items-center justify-center gap-4">
        <p className="text-2xl font-bold text-slate-700">Loading...</p>
      </div>
    );
  }

  let dataToRender: any | null;
  // determine which data to render based on filtering and sorting
  if (sortBy !== "") {
    if (
      data?.results?.length > 0 &&
      filteredCharacters?.results?.length === 0
    ) {
      dataToRender = data.results.sort((a: any, b: any) =>
        a[sortBy].localeCompare(b[sortBy])
      );
    } else if (filteredCharacters?.results?.length > 0) {
      dataToRender = filteredCharacters.results.sort((a: any, b: any) =>
        a[sortBy].localeCompare(b[sortBy])
      );
    }
  } else {
    if (
      data?.results?.length > 0 &&
      filteredCharacters?.results?.length === 0
    ) {
      dataToRender = data.results;
    } else if (filteredCharacters?.results?.length > 0) {
      dataToRender = filteredCharacters.results;
    } else {
      dataToRender = null;
    }
  }

  if (isError || isFilteredError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-slate-700">Error</h1>
        <p className="text-lg text-slate-700">
          {error?.message || filteredError?.message}
        </p>
      </div>
    );
  }

  const handleSetSortBy = (sortBy: string) => {
    setSortBy(sortBy);
  };

  return (
    <div className="flex flex-col gap-4 font-mono px-12">
      {dataToRender?.results?.length === 0 || dataToRender === null ? (
        <EmptyResult />
      ) : (
        <>
          <CharactersHeader
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            handleSetSortBy={handleSetSortBy}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 my-6">
            {dataToRender !== null &&
              dataToRender.map((character: any) => (
                <CharacterItem key={character.id} character={character} />
              ))}
            <ScrollToTop smooth />
          </div>
          <div className="flex flex-row items-center justify-between my-10">
            <button
              disabled={data?.info?.prev === null}
              onClick={() => setPage(data?.info?.prev?.split("=")[1] || "")}
              className="rounded-full bg-blue-300 px-4 py-2 hover:bg-blue-500"
            >
              Previous
            </button>
            <button
              disabled={data?.info?.next === null}
              onClick={() => setPage(data?.info?.next?.split("=")[1] || "")}
              className="rounded-full bg-blue-300 px-4 py-2 hover:bg-blue-500"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Characters;
