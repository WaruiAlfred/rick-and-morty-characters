import { FC } from "react";
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";

interface SortButtonProps {
  text: string;
  handleSetSortBy: (sortBy: string) => void;
}

const SortButton: FC<SortButtonProps> = ({ text, handleSetSortBy }) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <IconButton
        size="small"
        onClick={() => handleSetSortBy(text.toLowerCase())}
      >
        <ArrowUpwardIcon />
      </IconButton>
      <span className="text-lg italic text-gray-400">{text}</span>
    </div>
  );
};

export default SortButton;
