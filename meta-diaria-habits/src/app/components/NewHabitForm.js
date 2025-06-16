'use client';

import { useState } from 'react';
import IconSelect from './IconSelect';
import styles from '@/styles/NewHabitForm.module.css';
import { createHabit } from "@/server/actions";

export default function NewHabitForm() {
    const [icon, setIcon] = useState('sun');
    return (
        <form action={createHabit} className={styles.form}>
            <input type="text" name="name" placeholder="nome do hábito" required />
            <input type="hidden" name="icon" value={icon} />
            <IconSelect name={icon} onchange={setIcon} />
        </form>
    );
}