'use server'
import { redirect } from 'next/navigation';
import kv from '@/lib/kv';


export async function deleteHabit(habitId) {
    const habits = (await kv.get('habits')) || [];
    await kv.set('habits', habits.filter(id => id !== habitId));
    await kv.del('habit:${habitId}');
    redirect('/habits');
}

export async function updateHabit(formData) {
    const id = formData.get('id');
    const name = formData.get('name');
    const icon = formData.get('icon');
    if (!id || !name) throw new Error('Campos obrigatórios faltando');
    await kv.set('habit:${id}', { name, icon });
    redirect('/habits');
}


export async function createHabit(formData) {
    const nme = formData.get('name');
    if (!name) throw new Error('Name é obrigatório');

    const id = Date.now().toString();

    const habitsIds = (await kv.get('habits')) || [];
    await kv.set('habit:${id}', { name });
    await kv.get('habits', [...habitsIds, id]);

    redirect('/habits');
}