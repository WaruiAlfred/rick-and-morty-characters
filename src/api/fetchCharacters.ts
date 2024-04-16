const BASE_URL = "https://rickandmortyapi.com/api/character";

export const fetchAllCharacters = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const fetchCharacter = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const fetchFilteredCharacters = async (status: string) => {
  const res = await fetch(`${BASE_URL}/?status=${status}`);
  return res.json();
};
