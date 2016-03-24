import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';
import { DonePipe } from './done.pipe';

@Component ({
    selector: 'task-list',
    inputs: ['taskList'],
    outputs: ['onTaskSelect'],
    pipes: [DonePipe],
    directives: [TaskComponent, EditTaskDetailsComponent, NewTaskComponent],
  template: `
    <select (change)="onChange($event.target.value)" class="filter">
      <option value="all">Show All</option>
      <option value="done">Show Done</option>
      <option value="notDone" selected="selected">Show Not Done</option>
    </select>
    <task-display *ngFor="#theCurrentTask of taskList | done: filterDone"
      (click)="taskClickedMethod(theCurrentTask)"
      [class.selected]="theCurrentTask === selectedTask"
      [task]="theCurrentTask">
    </task-display>
    <edit-task-details *ngIf="selectedTask" [task]="selectedTask">
    </edit-task-details>
    <new-task (onSubmitNewTask)="createTask($event)"></new-task>
  `
  //[class.selected]="currentTask === selectedTask", tells Angular to either add or remove the class selected based on whether or not the condition to the right of the equals sign is true: currentTask === selectedTask. So, if the currentTask displayed by the *ngFor loop is equal to the selectedTask component property, then the <h3> is highlighted blue.
})
export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  public selectedTask: Task; //use it to keep track of which task object was last clicked on
  public filterDone: string = "notDone";
  constructor(){
    this.onTaskSelect = new EventEmitter();
  }
  taskClickedMethod(clickedTask: Task): void {
    console.log('child', clickedTask);
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask);
  }
  createTask(description: string): void {
    this.taskList.push(
      new Task(description, this.taskList.length)
    );
  }
  onChange(filterOption){
    this.filterDone = filterOption;
  }
}
