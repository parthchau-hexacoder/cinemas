import { useNavigate } from "react-router-dom";
import type { Theater } from "../types";
import TheaterCard from "./theater/TheaterCard";

interface TheaterListProps {
  theaters: Theater[]
}

const TheaterList = ({ theaters }: TheaterListProps) => {
  const navigate = useNavigate();

  return (
    <div className="mt-4">
      {theaters?.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 text-lg">No theaters data available</p>
        </div>
      )}
      {theaters?.map((theater: Theater) => (
        <TheaterCard
          key={theater.id}
          theater={theater}
          onClick={() => navigate(`/theater/${theater.id}`, { state: theater })}
        />
      ))}
    </div>
  )
}

export default TheaterList;
