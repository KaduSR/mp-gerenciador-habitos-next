"use server";

import kv from "@/lib/kv";

export async function toggleHabit(habitId) {
  const key = `habitLog:${habitId}:${new Date().toISOString().slice(0, 10)}`;
  const isDone = (await kv.get(key)) === "true";
  await kv.set(key, (!isDone).toString());
  return !isDone;
}
