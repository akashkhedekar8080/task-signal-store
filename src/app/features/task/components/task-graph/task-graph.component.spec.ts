import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGraphComponent } from './task-graph.component';

describe('TaskGraphComponent', () => {
  let component: TaskGraphComponent;
  let fixture: ComponentFixture<TaskGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
