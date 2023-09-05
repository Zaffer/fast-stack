import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { LoadingController, ToastController, ViewWillEnter } from '@ionic/angular';
import { CalendarOptions, Calendar, EventApi, DateSelectArg, EventClickArg, EventInput, EventSourceInput, EventSourceFuncArg, EventSourceFunc } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class SchedulerComponent implements OnInit, OnDestroy {

  private TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
  private SAMPLE_EVENTS: EventInput[] = [
    {
      id: '1',
      title: 'All-day event 1',
      start: this.TODAY_STR
    },
    {
      id: '2',
      title: 'Timed event 2',
      start: this.TODAY_STR + 'T00:00:00',
      end: this.TODAY_STR + 'T03:00:00'
    },
    {
      id: '3',
      title: 'Timed event 3',
      start: this.TODAY_STR + 'T12:00:00',
      end: this.TODAY_STR + 'T15:00:00'
    }
  ];

  @Input() editable: boolean = true;
  @Input() selectable: boolean = true;

  @Input() calendarOptions: CalendarOptions
  @Input() events: EventSourceFunc = this.handleEventsFunc;
  @Input() eventClick: (clickInfo: EventClickArg) => void = this.handleEventClick;
  @Input() select: (clickInfo: DateSelectArg) => void = this.handleSelect;
  @Input() eventSet: (events: EventApi[]) => void = this.handleEventsSet;

  // @Output() calendarEl: FullCalendarComponent;

  @ViewChild(FullCalendarComponent) fullCalendar: FullCalendarComponent;

  public get api(): Calendar {
    return this.fullCalendar.getApi();
  }

  constructor(
    private changeDetector: ChangeDetectorRef
    //   public loadingController: LoadingController,
    //   public toastController: ToastController
  ) { }


  ngOnInit() {
    // initialise here so that directive inputs have data from parent
    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'prev,next,today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth,listWeek'
      },
      initialView: 'timeGridWeek',
      // initialEvents: this.initialEvents, // alternatively, use the `events` setting to fetch from a feed
      events: this.events.bind(this),
      weekends: true,
      editable: this.editable,
      selectable: this.selectable,
      selectMirror: true,
      dayMaxEvents: true,
      nowIndicator: true,
      select: this.select.bind(this),
      eventClick: this.eventClick.bind(this),
      eventsSet: this.handleEventsSet.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }

  ngOnDestroy(): void {
  }

  handleSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: '1',
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEventsSet(events: EventApi[]) {
    console.log('events updated')
    this.SAMPLE_EVENTS = events;
    this.changeDetector.detectChanges();
  }


  /**
   * You can use this sample to show how to use an events function
   * 
   * be aware of the type requirement:
   * type EventSourceFunc = ((arg: EventSourceFuncArg, successCallback: (eventInputs: EventInput[]) => void, failureCallback: (error: Error) => void) => void) | ((arg: EventSourceFuncArg) => Promise<EventInput[]>);
   * 
   * You will need to create the function as a variable, like this:
   * 
      getEvents = (arg: EventSourceFuncArg, successCallback, failureCallback) => {
        const sub = this.api.getAllEvents(arg.startStr, arg.endStr)
          .subscribe({
            error(err) {
              failureCallback(new Error('error'));
            },
            next: (value) => {
              successCallback(value);
            },
            complete: () => {
              sub.unsubscribe();
            },
          });
      }
   * 
   */
  handleEventsFunc(
    arg: EventSourceFuncArg,
    successCallback: (eventInputs: EventInput[]) => void,
    failureCallback: (error: Error) => void
  ): void {

    const SAMPLE_EVENTS: EventInput[] = [
      {
        id: '1',
        title: 'NEW API EVENT',
        start: this.TODAY_STR + 'T00:00:00',
        end: this.TODAY_STR + 'T18:00:00'
      }
    ];

    if (SAMPLE_EVENTS) {
      successCallback(SAMPLE_EVENTS);
    } else {
      failureCallback(new Error('error'));
    }
  }
}
