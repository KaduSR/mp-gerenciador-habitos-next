// app/page.js
import Header from "@/app/components/Header";
import HabitsList from "@/app/components/HabitsList";
import kv from "../lib/kv";

export default async function HomePage() {
  // carregue dados do KV ou apenas dummy
  const dummyHabits = [
    { id: "1", name: "Meditar" },
    { id: "2", name: "Ler" },
  ];

  return (
    <>
      <Header />
      <HabitsList habits={dummyHabits} />
    </>
  );
}
