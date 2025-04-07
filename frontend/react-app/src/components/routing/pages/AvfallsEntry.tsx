import React from "react";
import { AvfallsIcon } from "../../iconsAndLogos/AvfallsIcon";

interface AvfallsEntryProps {
  data: {
    id: number;
    name: string;
    antall: number;
  };
}

const AvfallsEntry: React.FC<AvfallsEntryProps> = ({ data }) => {
  return (
    <div className="flex items-center space-x-4 p-2 border-b">
      <AvfallsIcon id={data.id} />
      <span className="text-lg">{data.name}</span>
      <span className="text-gray-600">{data.antall}</span>
    </div>
  );
};

export default AvfallsEntry;
