import { create } from "zustand";
import { Task } from "./types/Task";

// with undo and redo
export interface Store {
  tasks: Task[];
  undoStack: Task[][];
  redoStack: Task[][];
  filterValues: {
    category: string[];
    sortBy: string;
  };

  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
  clearTasks: () => void;
  undo: () => void;
  redo: () => void;
  setFilterValues: (
    filterValues: Partial<{
      category: string[];
      sortBy: string;
    }>
  ) => void;
}

const useStore = create<Store>()((set) => ({
  tasks: [],
  undoStack: [],
  redoStack: [],
  filterValues: {
    category: ["all"],
    sortBy: "createdAt",
  },

  setTasks: (tasks) => set({ tasks }),
  addTask: (task) =>
    set((state: Store) => {
      const newTasks = [...state.tasks, task];
      state.undoStack.push(state.tasks);
      return { tasks: newTasks };
    }),
  removeTask: (id) =>
    set((state: Store) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      state.undoStack.push(state.tasks);
      return { tasks: newTasks };
    }),
  updateTask: (task) =>
    set((state: Store) => {
      const newTasks = state.tasks.map((t: { id: string }) =>
        t.id === task.id ? task : t
      );
      state.undoStack.push(state.tasks);
      return { tasks: newTasks };
    }),
  clearTasks: () =>
    set((state: Store) => {
      state.undoStack.push(state.tasks);
      return { tasks: [] };
    }),
  undo: () =>
    set((state: Store) => {
      const lastTasks = state.undoStack.pop();
      if (lastTasks) {
        state.redoStack.push(state.tasks);
        return { tasks: lastTasks };
      }
      return { tasks: state.tasks };
    }),
  redo: () =>
    set((state: Store) => {
      const lastTasks = state.redoStack.pop();
      if (lastTasks) {
        state.undoStack.push(state.tasks);
        return { tasks: lastTasks };
      }
      return { tasks: state.tasks };
    }),
  setFilterValues: (filterValues) =>
    set((state: Store) => {
      return { filterValues: { ...state.filterValues, ...filterValues } };
    }),
}));

export default useStore;
