import { Task, TaskStatus } from "../../../features/task/models/task.model";

export interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
  isLoading: boolean;
}
export const intialState: TaskState = {
  tasks: [],
  selectedTaskId: null,
  isLoading: false,
};
