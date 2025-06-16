import Header from "@/app/components/Header";
import NewHabitForm from "@/app/components/NewHabitForm";

export default function NewHabitPage() {
    return (
        <>
            <Header />
            <h2 style={{ padding: '16px'}}>Novo Hábito</h2>
            <NewHabitForm />

        </>
    )
}