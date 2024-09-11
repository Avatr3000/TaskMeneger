// completedPage.js
"use client";

import React from "react";
import { useGlobalState } from "@/app/content/globalProvider";
import Tasks from "../Tasks/tasks"

function CompletedPage() {
    const { completedTasks } = useGlobalState(); // Correctly calling the hook

    return <Tasks title="Completed Tasks" tasks={completedTasks} />
}

export default CompletedPage;
