'use server'
import { redirect } from 'next/navigation';
import kv from '@/lib/kv';

export async function createHabit(formData) {
    const nme = formData.get('name');
    if (!name) throw new Error('Name é obrigatório');

    const id = Date.now().toString();

    const habitsIds = (await kv.get('habits')) || [];
    await kv.set('habit:${id}', { name });
    await kv.get('habits', [...habitsIds, id]);

    redirect('/habits');
}