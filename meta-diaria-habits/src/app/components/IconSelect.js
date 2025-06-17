"use client";

import * as lucide from "lucide-react";
import { useState } from "react";
import styles from "@/styles/IconSelect.module.css";


const availableIcons = [
  "droplet",
  "dumbbell",
  "meditation",
  "tree-pine",
  "bed",
  "utensils",
  "sun",
  "moon",
  "coffee",
  "book",
  "check-circle",
];

export default function IconSelect({ name, onchange }) {
  const [showList, setShowList] = useState(false);

  const Icon =
    lucide[
      name.charAt(0).toUpperCase() +
        name.slice(1).replace(/-./g, (m) => m[1].toUpperCase())
    ] || lucide.Circle;

  return (
    <div style={{ marginTop: "1rem" }}>
      <label style={{ fontWeight: "bold" }}>Ícone selecionado:</label>
      <div
        onClick={() => setShowList(!showList)}
        style={{
          cursor: "pointer",
          border: "1px solid #ccc",
          padding: "0.5rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          borderRadius: "8px",
        }}
      >
        <Icon size={24} />
        <span>{name}</span>
        <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>
          (clique para trocar)
        </span>
      </div>

      {showList && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          {availableIcons.map((iconName) => {
            const IconOption =
              lucide[
                iconName.charAt(0).toUpperCase() +
                  iconName.slice(1).replace(/-./g, (m) => m[1].toUpperCase())
              ];
            return (
              <div
                key={iconName}
                onClick={() => {
                  onchange(iconName);
                  setShowList(false);
                }}
                style={{
                  cursor: "pointer",
                  padding: "0.5rem",
                  border:
                    iconName === name ? "2px solid blue" : "1px solid #ccc",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconOption size={24} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
