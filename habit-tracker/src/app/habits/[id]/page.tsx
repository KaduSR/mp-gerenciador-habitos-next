"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "@/app/components/ArrowLeft";
import { DayStatus, Habit } from "@/app/lib/habits";

interface HabitDetailProps {
  params: { id: string };
}

export default function HabitDetail({ params }: HabitDetailProps) {
  const { id } = params;
  const router = useRouter();
  const [habit, setHabit] = useState<Habit | null>(null);

  useEffect(() => {
    fetch(`/api/habits`)
      .then((res) => res.json())
      .then((habits: Habit[]) => {
        const found = habits.find((h) => h.id === id) || null;
        setHabit(found);
      });
  }, [id]);

  if (habit === null) return <p>Carregando...</p>;
  if (!habit) return <p>Hábito não encontrado.</p>;

  const daysInMonth = new Date().getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i);

  const toggleDay = async (dayIndex: number) => {
    const res = await fetch("/api/habits", {
      method: "PUT",
      body: JSON.stringify({ id, dayIndex }),
    });
    if (res.ok) {
      const updated: Habit = await res.json();
      setHabit(updated);
    }
  };

  const getIcon = (status: DayStatus) => {
    switch (status) {
      case "done":
        return "✅";
      case "missed":
        return "❌";
      default:
        return "⚪";
    }
  };

  return (
    <main className="w-full max-w-md">
      <div className="flex items-center mb-4">
        <button onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold">{habit.name}</h1>
      </div>

      <div className="grid grid-cols-7 text-center text-gray-400 mb-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
          <div key={d} className="text-sm font-medium">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((_, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-2 bg-zinc-800 rounded-md"
            onClick={() => toggleDay(index)}
          >
            <span className="text-sm text-gray-400">{index + 1}</span>
            <span className="text-lg">
              {getIcon(habit.week[index] || "unmarked")}
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
