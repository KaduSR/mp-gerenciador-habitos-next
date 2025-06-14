"use server";

import { kv } from "@vercel/kv";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

export async function createHabit(formData: FormData) {
    const title = formData.get("title") as string;

    if (!title) return;

    const id = uuid();
    const habit = {
        id,
        title,
        createdAt: Date.now(),
    };

    await kv.hset('habit:${id}', habit);
    await kv.sadd("habits", id);

    redirect("/habits");
}