"use client";

import { getIconFromText } from "@/js/icon-auto";
import * as lucide from "lucide-react";

import { useState } from "react";
import IconSelect from "./IconSelect";
import styles from "@/styles/NewHabitForm.module.css";
import { createHabit } from "@/server/actions";

export default function NewHabitForm() {
  const [icon, setIcon] = useState("sun");
  const [name, setName] = useState("");

  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);

    // Atualiza o ícone automaticamente conforme o texto
    const suggestedIcon = getIconFromText(value);
    setIcon(suggestedIcon);
  }

  return (
    <form action={createHabit} className={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="nome do hábito"
        value={name}
        onChange={handleNameChange}
        required
      />

      <input type="hidden" name="icon" value={icon} />

      {/* Visualização + seleção opcional do ícone */}
      <IconSelect name={icon} onchange={setIcon} />
    </form>
  );
}
