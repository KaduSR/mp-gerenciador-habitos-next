'use client';
import Header from "@/app/components/Header";
import NewHabitForm from "@/app/components/NewHabitForm";


export default function NewHabitPage() {
    const [habitName, setHabitName] = useState("");
    const [iconName, setIconName] = useState("circle");

    function handleInputChange(e) {
      const text = e.target.value;
      setHabitName(text);

      const icon = getIconFromText(text);
      setIconName(icon);
    }

    const IconComponent =
      lucide[iconName.charAt(0).toUpperCase() + iconName.slice(1)] ||
      lucide.Circle;

    return (
        <>
            <Header />
            <h2 style={{ padding: '16px'}}>Novo Hábito</h2>
            <NewHabitForm />

        </>
    )
}