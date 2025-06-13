'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewHabitPage() { 
    const router = useRouter();
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        alert('Novo Hábito adicionado: ${ name }');

        router.push('/');
    };

    const handleCancel = () => {
        router.push('/');
    };

    return(
        <main className='w-full max-w-md'>
            <h1 className='text-xl font-bold text-center mb-6'>Novo hábito</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {/* Input para controlador pelo estado "nome" */}

                <input type="text" placeholder="Nome do hábito" value={name} onChange={(e) => setName(e.target.value)} className="bg-zinc-800 p-3 rounded-md border border-zinc-700 focus:outline-none focus:ring- focus:ring-green-400" />
                
                <button type="submit" className="bg-green-400 text-black py-2 rounded-md font-semibold">
                    Cadastrar
                </button>

                <button type="button" onClick={handleCancel}
                    className="text-red-400 border border-red-400 py-2 rounded-md font-semibold hover:bg-red-red-400 hover:text-white transition">
                    Cancelar
                </button>
            </form>
        </main>
    )
}