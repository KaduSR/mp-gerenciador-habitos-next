import Link from 'next/link';
import { createHabit } from "@/lib/actions";

export default function NewHabitPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-4">
            <form action={createHabit} className="space-y-4 w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center">Novo Hábito</h1>

                <input name="title" type="text" placeholder="nome do hábito" className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" required />

                <div className="flex justify-between gap-2">

                    <Link href="/" className="flex-1 text-center bg-red-600 px-600 px-4 py-2 rounded">
                    Cancelar
                    </Link>
                    <button type="submit" className="flex-1 bg-green-600 px-4 py-2 rounded">
                        Cadastrar
                        </button>
                        </div>
            </form>
        </main>
    );
    }