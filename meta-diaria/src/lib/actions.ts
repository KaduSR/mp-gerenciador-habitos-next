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

export async function markDoneToday(formData: FormData) {
  const id = formData.get("id") as string;
  const today = new Date().toISOString().slice(0, 10);

  if (!id) return;

  await kv.sadd(`habit:${id}:dates`, today);
}