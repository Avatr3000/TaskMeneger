"use client";
import { useGlobalState, useGlobalUpdate } from "@/app/content/globalProvider";  // Import both hooks
import { edit, trash } from "@/app/utils/icons";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";

interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  date: string;
}

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: number;
  task: Task;
}

function TaskItem({ title, description, date, isCompleted, id }: Props) {
  const { theme } = useGlobalState();
  const { deleteTask, updateTask } = useGlobalUpdate(); 

  const handleDeleteTask = () => {
    console.log(`Attempting to delete task with id: ${id}`);
    deleteTask(id);  // Call deleteTask to remove task from global state
  };

  const handleUpdate = () => {
    const task: Task = {
      id,
      title,
      description,
      isCompleted: !isCompleted, // Toggle isCompleted
      date,
    };
    updateTask(task);
  };


  return (
    <TaskItemStyled theme={theme} isCompleted={isCompleted}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p className="date">{formatDate(date)}</p>
      <div className="task-footer">
      {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}
        <button className="edit">{edit}</button>
        <button className="delete" onClick={handleDeleteTask}>{trash}</button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }

    .incomplete {
      background: ${(props) => props.theme.colorDanger};
    }
  }
`;

export default TaskItem;
