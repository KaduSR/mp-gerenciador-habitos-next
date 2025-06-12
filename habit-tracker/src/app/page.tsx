'use client'

import { HabitItem } from "@/components/HabitItem";
import Link from "next/link";
import { useState } from React;

const initialHabits = [
  {
    id: '1',
    name: 'Beber 2 litros de água',
    week: ['done', 'done', 'unmarked', 'done', 'done', 'missed', 'unmarked'],
  },
  {
    id: '2',
    name: 'Fazer exercício físico',
    week: ['unmarked', 'done','done','done','done',]
  }
  }
]

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