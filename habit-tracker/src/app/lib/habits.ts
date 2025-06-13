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
  let cursor = "0";
  do {
    const [nextCursor, keys] = await redis.scan(cursor, {
      match: "habit:*",
      count: 1000,
    });
    cursor = nextCursor;
    for (const key of keys) {
      const str = await redis.get<string>(key);
      if (str) habits.push(JSON.parse(str));
    }
  } while (cursor !== "0");
  return habits;
}

export async function toggleDayStatus(
  habitId: string,
  dayIndex: number
): Promise<Habit | null> {
  const key = "habit:${habitId}";
  const raw = await redis.get<string>(key);
  if (!raw) return null;

  const habit: Habit = JSON.parse(raw);
  const next = {
    done: "missed",
    missed: "unmarked",
    unmarked: "done",
  } as Record<DayStatus, DayStatus>;
  habit.week[dayIndex] = next[habit.week[dayIndex]];
  await redis.set(key, JSON.stringify(habit));
  return habit;
}

export async function deleteHabit(id: string): Promise<boolean> {
  const key = "habit:${id}";
  const removed = await redis.del(key);
  return removed > 0;
}
