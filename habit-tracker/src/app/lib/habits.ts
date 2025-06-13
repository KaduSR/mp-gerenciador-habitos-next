import { redis } from "./redis";
import { randomUUID } from "crypto";

export type DayStatus = "done" | "missed" | "unmarked";

export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  week: DayStatus[];
}

export async function saveHabit(name: string): Promise<Habit> {
  const id = randomUUID();
  const habit: Habit = {
    id,
    name,
    createdAt: new Date().toISOString(),
    week: Array<DayStatus>(7).fill("unmarked"),
  };

  await redis.set("habit:${id}", JSON.stringify(habit));
  return habit;
}

export async function getAllHabits(): Promise<Habit[]> {
  const habits: Habit[] = [];
  let cursor = 0;
  do {
    const [newCursor, keys] = await redis.scan(cursor, {
      match: "habit:*",
      count: 1000,
    });
    cursor = Number(newCursor);
    for (const key of keys) {
      const str = await redis.get<string>(keys);
      if (str) habits.push(JSON.parse(str));
    }
  } while (cursor !== 0);
  return habits;
}
