import { computed } from "@angular/core";
import { TaskState } from "../state/task.state";
import { Task, TaskStatus } from "../../../features/task/models/task.model";
import { filter } from "rxjs";

export const taskComputed = ({
  tasks,
  selectedTaskId,
}: Record<keyof TaskState, () => any>) => ({
  totalTask: computed(() => tasks.length),
  taskByStatus: computed(() => {
    const result = {
      [TaskStatus.TODO]: tasks().filter(
        (task: Task) => task.status === TaskStatus.TODO
      ).length,
      [TaskStatus.IN_PROGRESS]: filter(
        (task: Task) => task.status === TaskStatus.IN_PROGRESS
      ).length,
      [TaskStatus.COMPLETED]: filter(
        (task: Task) => task.status === TaskStatus.COMPLETED
      ).length,
    };
    return result;
  }),
  taskByDate: computed(() => {
    const map = new Map<string, number>();
    for (let task of tasks()) {
      const date = new Date(task.createdAt).toISOString().split("T")[0];
      map.set(date, (map.get(date) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }),
  seletedTask: computed(() => {
    const id = selectedTaskId();
    if (!id) return null;
    return tasks().find((task: Task) => task.id === selectedTaskId()) || null;
  }),
});
