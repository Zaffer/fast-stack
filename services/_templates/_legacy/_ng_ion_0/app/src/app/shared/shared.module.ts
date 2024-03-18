import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from "@fullcalendar/angular";
import { SchedulerComponent } from './components/scheduler/scheduler.component';

@NgModule({
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  declarations: [SchedulerComponent],
  exports: [SchedulerComponent],
  schemas: [],
  bootstrap: []
})
export class SharedModule { }
