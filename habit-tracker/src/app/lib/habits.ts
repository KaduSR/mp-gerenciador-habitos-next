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
  const key = `habit:${id}`;
  const removed = await redis.del(key);
  return removed > 0;
}

const montKey = (id: string, date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `habit:${id}:${date.getFullYear()}-${month}`;
};

export async function toggleDayMonth(
  id: string,
  date: Date
): Promise<{ day: number; status: DayStatus } | null> {
  const key = montKey(id, date);
  const day = date.getDate();
  const field = `day:${day}`;

  const current = await redis.hget<string>(key, field);
  const next: DayStatus =
    current === "done" ? "missed" : current === "missed" ? "unmarked" : "done";

  await redis.hset(key, { [field]: next });
  return { day, status: next };
}

export async function getMonthStatuses(
  id: string,
  date: Date
): Promise<Record<number, DayStatus>> {
  const key = montKey(id, date);
  const all = await redis.hgetall(key);
  const result: Record<number, DayStatus> = {};
  for (const [field, val] of Object.entries(all ?? {})) {
    const match = field.match(/^day:(\d+)$/);
    if (match) result[parseInt(match[1], 10)] = val as DayStatus;
  }
  return result;
}
