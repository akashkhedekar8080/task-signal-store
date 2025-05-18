import {
  Component,
  computed,
  effect,
  inject,
  signal,
  ViewChild,
} from "@angular/core";
import { TaskStore } from "../../../../core/store/task.store";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { Task } from "../../models/task.model";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TaskDialogComponent } from "../task-dialog/task-dialog.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
@Component({
  selector: "app-task-table",
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinner,
  ],
  templateUrl: "./task-table.component.html",
  styleUrl: "./task-table.component.scss",
})
export class TaskTableComponent {
  private readonly taskStore = inject(TaskStore);

  readonly loading = computed(() => this.taskStore.isLoading());
  readonly tasks = computed(() => this.taskStore.tasks());

  displayedColumns: string[] = [
    "id",
    "title",
    "description",
    "status",
    "priority",
    "createdAt",
    "actions",
  ];
  readonly dataSource = signal(new MatTableDataSource<Task>([]));

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  readonly dialog = inject(MatDialog);
  constructor() {
    effect(() => {
      const tasks = this.tasks();
      if (tasks) {
        this.dataSource().data = tasks;
      }
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.taskStore.loadInitialTask();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource().paginator = this.paginator;
  }
  onAdd(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "500px",
      maxWidth: "95vw",
      data: { task: null },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) this.taskStore.addTask(result);
    });
  }
  onEdit(task: Task): void {
    this.taskStore.selectTask(task.id);
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "500px",
      maxWidth: "95vw",
      data: { task },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) this.taskStore.updateTask(result);
      this.taskStore.selectTask(null);
    });
  }
  onDelete(taskId: string): void {
    this.taskStore.selectTask(null);
    if (confirm("Are you sure you want to delete this task?")) {
      this.taskStore.deleteTask(taskId);
    }
  }
}
