import Header from '@/app/components/Header';
import kv from '@/lib/kv';
import EditHabitForm from '@/app/components/EditHabitForm';
import DeleteHabitButton from '@/app/components/DeleteHabitButton';
import {Lucide } from 'lucide-react';


export default async function HabitDetailPage({ params }) {
    const { id } = params;
    const habit = await kv.get('habit:${id}');
    if (!habit) return <p>Hábito não encontrado</p>;

    return (
      <>
        <main style={{ padding: "16px" }}>
          <Header />
          <h2>Editar Hábito</h2>
          <EditHabitForm habit={{ id, ...habit }} />
          <DeleteHabitButton id={id} />
        </main>
      </>
    );
}