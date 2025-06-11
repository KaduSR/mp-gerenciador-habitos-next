import Link from "next/link";

export default function Home() {
  const habits = [];

  return (
    <main className="w-full max-w-md">
      {habits.length === 0 ? (
        <p className="text-center mb-8">Você ainda não cadastrou nenhum hábito</p>
      ) : (
        <ul>{/* Aqui colocarei depois os hábitos cadastrados */}</ul>
      )}

      <Link href="/habits/new">
        <button className="w-full mt-4 bg-green-500 text-black font-bold py-2 rounded-lg">
          Novo hábito
        </button>
      </Link>
    </main>
  );
}