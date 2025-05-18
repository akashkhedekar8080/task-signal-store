export enum TaskStatus {
  TODO = "Todo",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}
export enum TaskPriority {
  HIGH = "High",
  LOW = "Low",
  MEDIUM = "Medium",
  CRITICAL = "Critical",
}
export interface Task {
  id: string | null;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}
