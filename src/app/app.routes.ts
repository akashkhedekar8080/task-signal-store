import { Routes } from "@angular/router";
export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import(
        "./features/task/page/task-dashboard/task-dashboard.component"
      ).then((c) => c.TaskDashboardComponent),
  },
  {
    path: "tasks",
    loadComponent: () =>
      import("./features/task/components/task-table/task-table.component").then(
        (c) => c.TaskTableComponent
      ),
  },
  {
    path: "charts",
    loadComponent: () =>
      import("./features/task/components/task-graph/task-graph.component").then(
        (c) => c.TaskGraphComponent
      ),
  },
];
