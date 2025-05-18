import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { Task, TaskPriority, TaskStatus } from "../../models/task.model";
@Component({
  selector: "app-task-dialog",
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: "./task-dialog.component.html",
  styleUrl: "./task-dialog.component.scss",
})
export class TaskDialogComponent {
  statuses: string[] = ["Todo", "In Progress", "Done"];
  priorities: string[] = ["Low", "Medium", "High", "Critical"];
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<TaskDialogComponent>);
  data = inject<{ task?: Task }>(MAT_DIALOG_DATA);
  taskForm!: FormGroup;
  isEditMode: boolean = false;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("h", this.data);
    this.isEditMode = !!this.data?.task;

    this.taskForm = this.fb.group({
      title: [
        this.data.task?.title || "",
        [Validators.required, Validators.maxLength(100)],
      ],
      description: [
        this.data.task?.description || "",
        Validators.maxLength(500),
      ],
      status: [this.data.task?.status || TaskStatus.TODO, Validators.required],
      priority: [
        this.data.task?.priority || TaskPriority.LOW,
        Validators.required,
      ],
    });
  }
  onSave(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      if (this.isEditMode) {
        taskData.id = this.data.task!.id;
        taskData.createdAt = this.data.task!.createdAt;
      }
      this.taskForm.reset();
      this.dialogRef.close(taskData);
    }
  }

  onCancel(): void {
    this.taskForm.reset();
    this.dialogRef.close();
  }
}
