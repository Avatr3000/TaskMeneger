import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false); // Manage modal state
  const theme = themes[selectedTheme];


const closeModel = () => {
      setModal(true);
};



const openModel = (key) => {
    setModal(false);
  };


  const createTask = async (task) => {
    try {
      const res = await axios.post('/api/tasks', task);
      toast.success('Task added');
      setTasks((prevTasks) => [res.data, ...prevTasks]); // Add the new task to the beginning of the list
      setModal(false); // Close modal after creating task
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const deleteTask = async (id) => {
    // Confirm the deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return; // Exit if the user cancels
  
    try {
      console.log(`Attempting to delete task with ID: ${id}`);
  
      // Send the delete request to the server
      const response = await axios.delete(`/api/tasks/${id}`);
  
      console.log("Delete response:", response.data);
  
      if (response.status === 200) {
        toast.success("Task deleted");
  
        // Update the task list, ensuring that prevTasks is an array
        setTasks((prevTasks) => {
          // Ensure prevTasks is an array
          if (!Array.isArray(prevTasks)) return [];
  
          if (prevTasks.length === 1) {
            // If there's only one task, clear the array
            return [];
          } else {
            // Otherwise, filter out the deleted task by its ID
            return prevTasks.filter((task) => task.id !== id);
          }
        });
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };
  
  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks/${task.id}`, task); // Make sure the endpoint is correct
      toast.success("Task Updated");
      
      // Update local state with the updated task
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? res.data : t))
      ); 
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };




const completedTasks = Array.isArray(tasks) ? tasks.filter((task) => task.isCompleted === true) : [];
const importantTasks = Array.isArray(tasks) ? tasks.filter((task) => task.importantTasks === true) : [];
const incompleteTasks = Array.isArray(tasks) ? tasks.filter((task) => task.incompleteTasks === true) : [];

  const allTasks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/tasks");
      setTasks(res.data);  
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch tasks");
      setIsLoading(false);
    ;
    }
  };

  

  React.useEffect(() => {
    if (user) allTasks();  // Fetch tasks once user is loaded
  }, [user]);

  const openModal = () => setModal(true);  // Function to open the modal
  const closeModal = () => setModal(false); // Function to close the modal

  return (
    <GlobalContext.Provider value={{ theme, tasks, isLoading, modal, importantTasks, incompleteTasks, completedTasks }}>
      <GlobalUpdateContext.Provider value={{ 
        createTask, 
        deleteTask, 
        updateTask, 
        allTasks, 
        openModal, 
        closeModal,
        importantTasks,
        incompleteTasks,
        completedTasks, 
        modal,
        closeModal,
        openModal,
      }}
        >
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);