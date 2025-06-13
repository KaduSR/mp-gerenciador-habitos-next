"use client";

import { useRouter } from "next/navigation";
import { Check } from "@/app/components/icons/Check";
import { Cancel } from "@/app/components/icons/Cancel";
import { Circle } from "@/app/components/icons/Circle";
import { Trash } from "@/app/components/icons/Trash";


type DayStatus = "done" | "missed" | "unmarked";

interface HabitItemProps {
  id: string;
  name: string;
  week: DayStatus[];
  onDelete: (id: string) => void;
}

export function HabitItem({ id, name, week, onDelete }: HabitItemProps) {
  const router = useRouter();

  function getStatusIcon(status: DayStatus) {
    switch (status) {
      case "done":
        return <Check />;
      case "missed":
        return <Cancel />;
      default:
        return <Circle />;
    }
  }

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
            <Trash />
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
