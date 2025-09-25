import { createSlice } from "@reduxjs/toolkit";

const dummyData = {
  "to do": {
    color: "#2b7fff",
    tasks: [
      {
        id: 1,
        title: "Design Landing Page",
        description:
          "Create wire frames and mockups for the website’s landing page.",
        priority: "low",
        dueDate: new Date().toISOString().split("T")[0],
        assignee: "Alice",
      },
      {
        id: 2,
        title: "Configure Redux Toolkit for managing board state.",
        description: "",
        priority: "high",
        dueDate: new Date().toISOString().split("T")[0],
        assignee: "Bob",
      },
    ],
  },

  "in progress": {
    color: "#f0b100",
    tasks: [
      {
        id: 3,
        title: "Build Navbar Component",
        description: "Create a responsive navbar with logo and search input.",
        priority: "medium",
        dueDate: new Date().toISOString().split("T")[0],
        assignee: "Diana",
      },
      {
        id: 4,
        title: "Implement Task Card",
        description:
          "Create a card component to display tasks with title, description, and assignee.",
        priority: "low",
        dueDate: new Date().toISOString().split("T")[0],
        assignee: "Alice",
      },
    ],
  },

  review: {
    color: "#ad46ff",
    tasks: [
      {
        id: 5,
        title: "Code Review for Navbar Component",
        description:
          "Review the implementation of the Navbar to ensure responsive design and accessibility.",
        priority: "high",
        dueDate: new Date().toISOString().split("T")[0],
        assignee: "Charlie",
      },
    ],
  },

  done: {
    color: "#00c950",
    tasks: [
      {
        id: 9,
        title: "Implement Authentication Flow",
        description:
          "Created login and signup pages with form validation and connected them to mock API endpoints.",
        priority: "high",
        dueDate: new Date().toISOString().split("T")[0],
        assignee: "Evelyn",
      },
    ],
  },
};

const loadTasks = () => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : dummyData;
};

const initialState = loadTasks();

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addNewBoard: (state, action) => {
      const { boardName, color } = action.payload;
      state[boardName] = { color, tasks: [] };
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    deleteBoard: (state, action) => {
      delete state[action.payload]; // delete the board
      localStorage.setItem("tasks", JSON.stringify(state)); // update storage
    },

    addTask: (state, action) => {
      const { label, taskDetails, date, priority } = action.payload;
      // Generate random unique id
      const newID = crypto.randomUUID();
      // Crate the new task
      const newTask = {
        id: newID,
        title: taskDetails.title,
        description: taskDetails.description,
        priority,
        dueDate: date,
        assignee: taskDetails.assignee,
      };

      // Add the new task
      state[label].tasks.push(newTask);

      // Save it in the local storage
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    editTask: (state, action) => {
      const { label, taskDetails, date, priority, taskIndex } = action.payload;
      const prevTask = state[label].tasks[taskIndex];

      state[label].tasks[taskIndex] = {
        id: prevTask.id,
        title: taskDetails.title,
        description: taskDetails.description,
        priority: priority || prevTask.priority,
        dueDate: date,
        assignee: taskDetails.assignee,
      };

      localStorage.setItem("tasks", JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const { label, id } = action.payload;
      if (state[label]) {
        state[label].tasks = state[label].tasks.filter(
          (task) => task.id !== id
        );
      }

      localStorage.setItem("tasks", JSON.stringify(state));
    },
  },
});

export const { addNewBoard, deleteBoard, addTask, editTask, deleteTask } =
  boardSlice.actions;
export default boardSlice.reducer;
