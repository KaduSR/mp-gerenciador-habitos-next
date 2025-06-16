"use client";
import { deleteHabit } from "@/server/actions";
import styles from "@/styles/DeleteHabitButton.module.css";

export default function DeleteHabitButton({ id }) {
  return (
    <form action={() => deleteHabit(id)}>
      <button type="submit" className={styles.button}>
        Excluir Hábito
      </button>
    </form>
  );
}
