import { NextResponse } from "next/server";
import { saveHabit, getAllHabits, toggleDayStatus, deleteHabit } from "@/app/lib/habits";


export async function POST(req: Request) {
    const { name } = await req.json();
    if (!name || !name.trim()) { 
        return NextResponse.json({ error: 'Nome inválido' }, { status: 400 });
    }
    const habit = await saveHabit(name);
    return NextResponse.json(habit, { status: 201 });
}

export async function GET() {
    const habits = await getAllHabits();
    return NextResponse.json(habits, { status: 200 });
}

export async function PUT(req: Request) {
    const { id, dayIndex } = await req.json();
    if (typeof id !== 'string' || typeof dayIndex !== 'number') {
        return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const updated = await toggleDayStatus(id, dayIndex);
    if (!updated) return NextResponse.json({ error: 'Hábito não encontrado' }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
}

export async function DELETE (req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
    }
    const ok = await deleteHabit(id);
    if (!ok) return NextResponse.json({ error: 'Hábito não encontrado' }, { status: 404 });
    return NextResponse.json({ sucess: true, message: 'Hábito deletado com sucesso' }, { status: 200 });
}