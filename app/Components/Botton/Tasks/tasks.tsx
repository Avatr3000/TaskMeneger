"use client";
import { useGlobalState } from "@/app/content/globalProvider";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskItem from "../Task_item/task_item";
import { add, plus } from "@/app/utils/icons";
import Modal from "../Modal/Modal";
import CreateContent from "../Modal/CreateContent";

interface Task {
  id: number;
  title: string;
  description?: string;
  date: string;
  isCompleted?: boolean;
}

interface Props {
  title: string;
  tasks: Task[]; // Ensure tasks is required
}

function Tasks({ title, tasks = [] }: Props) { // Provide default value for tasks
  const { theme, openModal, isLoading } = useGlobalState();
  const [taskList, setTaskList] = useState<Task[]>(Array.isArray(tasks) ? tasks : []); // Ensure taskList is an array

  

  useEffect(() => {
    if (Array.isArray(tasks)) {
      setTaskList(tasks);
    }
  }, [tasks]);

  const handleAddTask = () => {
    const newTask: Task = {
      id: taskList.length + 1,
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      isCompleted: false,
    };
    setTaskList([...taskList, newTask]);
  };

  const handleDeleteTask = (id: number) => { setTaskList((prevTaskList) => prevTaskList.filter((task) => task.id !== id)); };

  return (
    <TaskStyled theme={theme}>
      {isLoading ? (
        <div className="tasks-loader w-full items-center justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <>
        {Modal && <Modal content={<CreateContent/>}/>}
          <h1>{title}</h1>

          <button className="btn-rounded" onClick={handleAddTask}>
            {plus}
          </button>

          <div className="tasks grid">
          {Array.isArray(taskList) && taskList.length > 0 ? (
              taskList.map((task) => (
              <TaskItem
                    key={task.id}  // Ensure the key and id are unique
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    date={task.date}
                    isCompleted={task.isCompleted}
                    task={task}
              />
            ))
          ) : (
            <></>
          )}
            <button className="create-task" onClick={handleAddTask}>
              {plus}
              Add New Task
            </button>
          </div>
        </>
      )}
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 3rem;
      right: 3.5rem;
    }
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;