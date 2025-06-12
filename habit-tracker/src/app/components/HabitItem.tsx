"use client";

import { useRouter } from "next/navigation";
import { FaTrash, FaCheck, FaTimes, FaCircle } from "react-icons/fa";

type DayStatus = "done" | "missed" | "unmarked";

interface HabitItemProps {
  id: string;
  name: string;
  week: DayStatus[];
  onDelete: (id: string) => void;
}

export function HabitItem({ id, name, week, onDelete }: HabitItemProps) {
  const router = useRouter();

  const getStatusIcon = (status: DayStatus) => {
    switch (status) {
      case "done":
            return (
                <div className="text-green-400">
          <FaCheck />
        </div>)
      case "missed":
            return (
              <div className="text-red-400">
                <FaTimes />
              </div>
            );
      case "unmarked":
      default:
        return (
          <div className="text-gray-500">
            <FaCircle />
          </div>
        );
    }
  };

  const handleClick = () => router.push(`/habits/${id}`);

  return (
    <div className="bg-zinc-800 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <h3
          className="font-semibold text-lg cursor-pointer hover:underline"
          onClick={handleClick}
        >
          {name}
        </h3>
        <button onClick={() => onDelete(id)}>
          <div className="text-red-400 hover:text-red-600">
            <FaTrash />
          </div>
        </button>
      </div>

      <div className="flex justify-between text-sm mt-3">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
          <div key={day} className="flex flex-col items-center gap-1">
            <span className="text-gray-400">{day}</span>
            {getStatusIcon(week[index])}
          </div>
        ))}
      </div>
    </div>
  );
}
