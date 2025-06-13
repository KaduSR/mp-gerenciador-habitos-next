import Link from "next/link";
import { HabitItem } from "@/app/components/HabitItem";
import { getAllHabits, Habit } from "@/app/lib/habits";

export default async function Home() {
  const habits = await getAllHabits();

  return (
    <main className="w-full max-w-md">
      {habits.length === 0 ? (
        <p className="text-center mb-8">você não tem hábitos cadastrados</p>
      ) : (
        habits.map((h: Habit) => (
          <HabitItem key={h.id} {...h} onDelete={() => {}} />
        ))
      )}
      <Link href="/habits/new">
        <button className="w-full mt-4 bg-green-400 text-black font-bold py-2 rounded-lg">
          novo hábito
        </button>
      </Link>
    </main>
  );
}
