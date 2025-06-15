"use client";

import { useState } from "react";
import styles from "@/styles/HabitCard.module.css";
import { toggleHabit } from "@/app/action";

export default function HabitCard({ habit, initialDone }) {
  const [done, setDone] = useState(initialDone);

  const hanbleClick = async () => {
    const newDonw = await toggleHabit(habit.id);
    setDone(newDone);
  };

  return (
    <div className={styles.card}>
      <span className={styles.name}>{habit.name}</span>
      <button
        className={styles.CheckButton}
        aria-label={`Marcar ${habit.name} como concluído`}
        onClick={hanbleClick}
      >
        {done ? "✔️" : "⚪"}
      </button>
    </div>
  );
}
