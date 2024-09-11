"use client";

import React from "react";
import Tasks from "../Tasks/tasks";
import { useGlobalState } from "@/app/content/globalProvider";

function incompletePage() {
    const { incompleteTasks } = useGlobalState
    return <Tasks title="Incomplete Tasks" tasks={incompleteTasks}/>
}

export default incompletePage;
