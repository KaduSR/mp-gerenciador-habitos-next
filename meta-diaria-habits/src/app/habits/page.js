import Header from "@/components/Header";
import HabitsList from "@/components/HabitsList";
import kv from "@/lib/kv";

export default async function HabitsPage() {
  const habits = (await kv.get("habits")) || [];
  const today = new Date().toISOString().slice(0, 10);

  const habitWithDone = await Promise.all(
    habits.map(async (habitId) => {
      const habit = await kv.get(`habit:${habitId}`);
      const done = (await kv.get(`habitLog:${id}:${today}`)) === true;
      return { id, name: habit.name,done };
    })
  );

  return (
    <>
      <Header />
      <HabitsList habits={habitWithDone} />
    </>
  );
}
