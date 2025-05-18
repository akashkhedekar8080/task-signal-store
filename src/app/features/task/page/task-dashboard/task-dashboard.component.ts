import { Component } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { TaskTableComponent } from "../../components/task-table/task-table.component";
import { TaskGraphComponent } from "../../components/task-graph/task-graph.component";

@Component({
  selector: "app-task-dashboard",
  imports: [MatTabsModule, TaskTableComponent, TaskGraphComponent],
  templateUrl: "./task-dashboard.component.html",
  styleUrl: "./task-dashboard.component.scss",
})
export class TaskDashboardComponent {}
