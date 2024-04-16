const BASE_URL = "https://rickandmortyapi.com/api/character";

export const fetchAllCharacters = async (page: string = "") => {
  let res = await fetch(`${BASE_URL}`);

  if (page.length > 0) {
    // if page has a value
    res = await fetch(`${BASE_URL}/?page=${page}`);
  }

  return res.json();
};

export const fetchCharacter = async (id: number | string) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};

export const fetchFilteredCharacters = async (
  status: string,
  page: string = ""
) => {
  let res = await fetch(`${BASE_URL}/?status=${status}`);

  if (page.length > 0) {
    // if page has a value
    res = await fetch(`${BASE_URL}/?status=${status}&page=${page}`);
  }

  return res.json();
};
