"use client";
import { useGlobalState } from "@/app/content/globalProvider";
import Tasks from "../Tasks/tasks";
import React from "react";

function ImportantPage() {
    const { importantTasks } = useGlobalState(); // Move the hook here
    return <Tasks title="Important Tasks" tasks={importantTasks} />;
}

export default ImportantPage;
