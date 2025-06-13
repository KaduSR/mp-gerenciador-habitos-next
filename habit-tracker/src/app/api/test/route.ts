import { NextResponse } from "next/server";
import { saveHabit, getAllHabits } from "@/app/lib/habits";

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