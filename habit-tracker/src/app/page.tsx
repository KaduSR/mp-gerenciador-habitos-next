"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@/app/components/icons/ArrowLeft";
import { ArrowRight } from "@/app/components/icons/ArrowRight";
import { Check } from "@/app/components/icons/Check";
import { Cancel } from "@/app/components/icons/Cancel";
import { Circle } from "@/app/components/icons/Circle";
import { DayStatus, Habit } from "@/app/lib/habits";

export default function HabitDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [habit, setHabit] = useState<Habit | false | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetch("/api/habits")
      .then((r) => r.json())
      .then((habits: Habit[]) => {
        const h = habits.find((h) => h.id === id) ?? false;
        setHabit(h);
      });
  }, [id]);

  if (habit === null) return <p className="text-center py-8">Carregando...</p>;
  if (!habit) return <p className="text-center py-8">Hábito não encontrado</p>;

  const prevMonth = () =>
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () =>
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const toggleDay = async (day: number | null) => {
    if (!day) return;
    const res = await fetch("/api/habits", {
      method: "PUT",
      body: JSON.stringify({ id, dayIndex: (day - 1) % 7 }),
    });
    if (res.ok) setHabit(await res.json());
  };

  const getIcon = (status: DayStatus) =>
    status === "done" ? (
      <Check />
    ) : status === "missed" ? (
      <Cancel />
    ) : (
      <Circle />
    );

  return (
    <main className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth}>
          <ArrowLeft />
        </button>
        <h2 className="text-lg font-semibold capitalize">
          {currentDate.toLocaleDateString("pt-br", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={nextMonth}>
          <ArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-gray-400 text-sm mb-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
          <div key={d} className="">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <button
            key={idx}
            disabled={!day}
            onClick={() => toggleDay(day)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors
              ${day ? "bg-zinc-800 hover:bg-zinc-700" : "bg-transparent"}`}
          >
            <time
              dateTime={day ? `${year}-${month + 1}-${day}` : ""}
              className="text-sm text-gray-400"
            >
              {day || ""}
            </time>
            {day && getIcon(habit.week[(day - 1) % 7])}
          </button>
        ))}
      </div>
    </main>
  );
}
