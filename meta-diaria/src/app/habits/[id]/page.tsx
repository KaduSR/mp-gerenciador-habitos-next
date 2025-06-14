import { kv } from "@/lib/kv";
import { notFound } from "next/navigation";
import { markDoneToday } from "@/lib/actions";
import { CheckIcon } from "@/components/icons/CheckIcon";

type Habit = {
  id: string;
  title: string;
  createdAt: number;
};

export default async function HabitDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const habit = await kv.hgetall<Habit>(`habit:${params.id}`);
  if (!habit?.id) return notFound();

  const dates = await kv.smembers<string>(`habit:${params.id}:dates`);
  const sorted = dates.sort().reverse();

  const today = new Date().toISOString().slice(0, 10);
  const alreadyDone = dates.includes(today);

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{habit.title}</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Criado em: {new Date(habit.createdAt).toLocaleDateString("pt-BR")}
      </p>

      <form action={markDoneToday}>
        <input type="hidden" name="id" value={habit.id} />
        <button
          type="submit"
          disabled={alreadyDone}
          className={`w-full py-2 px-4 rounded ${
            alreadyDone
              ? "bg-green-700 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {alreadyDone
            ? "Já marcado hoje <CheckIcon/>"
            : "Marcar como feito hoje"}
        </button>
      </form>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Dias marcados:</h2>
        {sorted.length === 0 ? (
          <p className="text-zinc-500">Nenhum dia marcado ainda.</p>
        ) : (
          <ul className="space-y-1 text-sm text-zinc-300">
            {sorted.map((date: string) => (
              <li key={date}>
                <CheckIcon /> {date}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
