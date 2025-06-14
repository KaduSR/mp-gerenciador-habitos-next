import { kv } from "@/lib/kv";
import Link from "next/link";

type Habit = {
  id: string;
  title: string;
  createdAt: number;
};

export default async function HabitsPage() {
  const ids = await kv.smembers<string>("habits");

  const habits: Habit[] = await Promise.all(
    ids.map(async (id) => {
      const data = await kv.hgetall<Habit>("habit:${id}");
      return data;
    })
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 py-8">
      <h1 className="text-2xl font-cold mb-6 text-center">Seus Hábitos</h1>
      {habits.length === 0 ? (
        <p className="text-center text-zinc-400">
          Nenhum hábito cadastrado ainda.
        </p>
      ) : (
        <ul className="space-y-4">
          {habits.map((habit) => (
            <li
              key={habit.id}
              className="bg-zinc-800 p-4 rounded shadow hover:bg-zinc-700 transition"
            >
              <Link href={"/habits/${habit.id}"} className="block">
                <h2 className="text-lg font-semibold">{habit.title}</h2>
                <p className="text-sm text-zinc-400">
                  Criando em{" "}
                  {new Date(habit.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/habits/new"
          className="bg-green-600 px-4 py-2 rounded text-black font-medium"
        >
          + Novo hábito
        </Link>
          </div>
          
    </main>
  );
}
