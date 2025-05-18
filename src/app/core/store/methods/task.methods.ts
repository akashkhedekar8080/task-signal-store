import { patchState } from "@ngrx/signals";
import { Task } from "../../../features/task/models/task.model";
import { mockTasks } from "../../constant/constant";

export const taskMethods = (store: any) => ({
  addTask(task: Omit<Task, "id" | "createdAt">) {
    const newTask = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...task,
    };
    patchState(store, { tasks: [...store.tasks(), newTask] });
  },
  updateTask(updatedTask: Task) {
    patchState(store, {
      tasks: store
        .tasks()
        .map((task: Task) => (task.id === updatedTask.id ? updatedTask : task)),
    });
  },
  deleteTask(taskId: string) {
    patchState(store, {
      tasks: store.tasks().filter((task: Task) => task.id !== taskId),
      selectedTaskId:
        store.selectedTaskId === taskId ? null : store.selectedTaskId(),
    });
  },
  selectTask(taskId: string | null) {
    patchState(store, { selectedTaskId: taskId });
  },
  loadInitialTask() {
    patchState(store, { loading: true });

    setTimeout(() => {
      patchState(store, {
        tasks: mockTasks,
        loading: false,
        selectedTaskId: null,
      });
    }, 500);
  },
});
