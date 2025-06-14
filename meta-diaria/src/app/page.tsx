import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-xl mb-4">Você não tem hábitos registrados</h1>
      <Link href="/habits/new" className="bg-green-500 text-black px-4 py-2 rounded">
        Adicionar hábito
      </Link>
    </main>
  );
}