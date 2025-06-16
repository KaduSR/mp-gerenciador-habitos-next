import styles from "@/styles/HabitsList.module.css";
import HabitCard from "./HabitCard";



export default function HabitsList({ habits = [] }) {
  return (
    <section className={styles.list}>
      {habits.length === 0 ? (
        <p className={styles.empty}>Você ainda não tem hábitos cadastrados. </p>
      ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={{ id: habit.id, name: habit.name }}
            initialDone={habit.done}
          />
          ))
      )}
    </section>
  );
}
