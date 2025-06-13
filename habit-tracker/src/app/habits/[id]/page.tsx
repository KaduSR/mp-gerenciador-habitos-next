"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "@/app/components/icons/ArrowLeft";
import { ArrowRight } from "@/app/components/icons/ArrowRight";
import { Check } from "@/app/components/icons/Check";
import { Cancel } from "@/app/components/icons/Cancel";
import { Circle } from "@/app/components/icons/Circle";
import { DayStatus, Habit } from "@/app/lib/habits";

export default function HabitDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [habit, setHabit] = useState<Habit | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());


  useEffect(() => {
    fetch("/api/habits")
      .then((res) => res.json())
      .then((list: Habit[]) => {
        const found = list.find((h) => h.id === id) ?? null;
        setHabit(found);
      });
  }, [id]);

  if (habit === null) return <p>Carregando...</p>;
  if (!habit)
    return (
      <main className="w-full max-w-md text-center">
        <p>Hábito não encontrado.</p>
        <Link href="/">⟵ voltar</Link>
      </main>
    );


  const prevMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };
  const nextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };


  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysArray: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const toggleDay = async (dayIdx: number) => {
    const res = await fetch("/api/habits", {
      method: "PUT",
      body: JSON.stringify({ id, dayIndex: dayIdx }),
    });
    if (res.ok) {
      const updated: Habit = await res.json();
      setHabit(updated);
    }
  };

  const getIcon = (status: DayStatus) =>
    status === "done" ? (
      <Check className="w-6 h-6" />
    ) : status === "missed" ? (
      <Cancel className="w-6 h-6" />
    ) : (
      <Circle className="w-6 h-6" />
    );

  return (
    <main className="w-full max-w-md">
      <div className="flex items-center mb-4">
        <button onClick={() => router.push("/")}>
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold flex-grow text-center">
          {habit.name}
        </h1>
        <button onClick={nextMonth}>
          <ArrowRight />
        </button>
        <button onClick={prevMonth}>
          <ArrowLeft />
        </button>
      </div>

     
      <div className="grid grid-cols-7 text-center text-gray-400 mb-2">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
          <div key={d} className="text-sm font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Calendário com alinhamento */}
      <div className="grid grid-cols-7 gap-2">
        {daysArray.map((day, idx) => (
          <button
            key={idx}
            disabled={!day}
            onClick={() => day && toggleDay((day - 1) % 7)}
            className={`flex flex-col items-center p-2 rounded-md ${
              day ? "bg-zinc-800" : "bg-transparent"
            }`}
          >
            <span className="text-sm text-gray-400">{day || ""}</span>
            {day && getIcon(habit.week[(day - 1) % 7] || "unmarked")}
          </button>
        ))}
      </div>
    </main>
  );
}