import { Component, computed, effect, inject, signal } from "@angular/core";
import { TaskStore } from "../../../../core/store/task.store";
import { TaskStatus } from "../../models/task.model";
import { BaseChartDirective } from "ng2-charts";
import { ChartConfiguration, ChartOptions } from "chart.js";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-task-graph",
  standalone: true,
  imports: [BaseChartDirective, MatTabsModule, MatProgressSpinnerModule],
  templateUrl: "./task-graph.component.html",
  styleUrl: "./task-graph.component.scss",
})
export class TaskGraphComponent {
  private readonly tasksStore = inject(TaskStore);

  loading = signal(true);

  pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Tasks Distribution by Status" },
    },
  };
  pieChartLabels = [
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETED,
  ];
  pieChartLegend = true;
  pieChartDatasets = computed(() => {
    const pieData = this.tasksStore.taskByStatus();
    return [
      {
        data: [
          pieData[TaskStatus.TODO],
          pieData[TaskStatus.IN_PROGRESS],
          pieData[TaskStatus.COMPLETED],
        ],
        backgroundColor: ["#ffcc00", "#36a2eb", "#4bc0c0"],
      },
    ];
  });

  lineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Tasks Created Over Time" },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { title: { display: true, text: "Task Count" } },
    },
  };
  lineChartLegend = true;
  lineChartData = computed(() => {
    const trend = this.tasksStore.taskByDate();
    return {
      labels: trend.map((item) => item.date),
      datasets: [
        {
          label: "Tasks Created",
          data: trend.map((item) => item.count),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.3,
        },
      ],
    } as ChartConfiguration<"line">["data"];
  });

  constructor() {
    effect(() => {
      this.pieChartDatasets();
      this.lineChartData();
      setTimeout(() => {
        this.loading.set(false);
      }, 500);
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tasksStore.loadInitialTask();
  }
}
