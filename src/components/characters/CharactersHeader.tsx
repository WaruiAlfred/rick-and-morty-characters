import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC } from "react";
import Logo from "../../assets/Rick_and_Morty_logo.webp";
import SortButton from "./SortButton";

interface CharactersHeaderProps {
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  filterStatus: string;
  handleSetSortBy: (sortBy: string) => void;
}

const CharactersHeader: FC<CharactersHeaderProps> = ({
  setFilterStatus,
  filterStatus,
  handleSetSortBy,
}) => {
  const handleFilterStatusChange = (event: SelectChangeEvent) => {
    setFilterStatus(event.target.value);
  };

  return (
    <div className="flex flex-col py-4 gap-4 items-center justify-center">
      <img src={Logo} alt="Rick and Morty Logo" className="w-2/5" />
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 w-full ">
        <div className="flex items-center gap-1">
          <SortButton text="Name" handleSetSortBy={handleSetSortBy} />
          <SortButton text="Status" handleSetSortBy={handleSetSortBy} />
          <SortButton text="Species" handleSetSortBy={handleSetSortBy} />
        </div>
        <div className="min-w-10 w-full md:w-2/5">
          <FormControl fullWidth size="small">
            <InputLabel id="filter-status">Filter...</InputLabel>
            <Select
              labelId="filter-status"
              id="filter-status"
              value={filterStatus}
              label="Filter..."
              onChange={handleFilterStatusChange}
            >
              <MenuItem value="">
                <em>Filter...</em>
              </MenuItem>
              <MenuItem value={"alive"}>Alive</MenuItem>
              <MenuItem value={"dead"}>Dead</MenuItem>
              <MenuItem value={"unknown"}>Unknown</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default CharactersHeader;
