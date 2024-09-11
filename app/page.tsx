"use client";
import Tasks from "@/app/Components/Botton/Tasks/tasks";
import { useGlobalState } from "./content/globalProvider";

export default function Home() {
  const { tasks } = useGlobalState();

  return <Tasks title="All Tasks" tasks={tasks} />;
}