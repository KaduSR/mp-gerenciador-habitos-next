'use client';
import styles from "@/styles/EditHabitForm.module.css";
import { updateHabit } from 'react';
import { useState } from 'react';
import IconSelect from './IconSelect';

export default function EditHabitForm({ habit }) {
    const [icon, setIcon] = useState(habit.icon || 'sun');

    return (
        <form action={updateHabit} className={styles.form}>
            <input type="hidden" name="id" value={habit.id} />
            <label>Nome:</label>
            <input type="text" name="name" defaultValue={habit.name} required />
            <input type="hidden" name="icon" value={icon} />
            <IconSelect icon={icon} onChange={setIcon} />
            <button type="submit" className={styles.button}>Salvar</button>
        </form>
    );
}