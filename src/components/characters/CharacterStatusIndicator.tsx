import { FC } from "react";

interface CharacterStatusIndicatorProps {
  status: string;
}

const CharacterStatusIndicator: FC<CharacterStatusIndicatorProps> = ({
  status,
}) => {
  return (
    <span
      className={`w-2 h-2 rounded-full mr-1 ${
        status === "Alive"
          ? "bg-green-500"
          : status === "Dead"
          ? "bg-red-500"
          : "bg-gray-500"
      }`}
    />
  );
};

export default CharacterStatusIndicator;
