import { Injectable } from '@angular/core';
import { filter, map, Subject } from 'rxjs';
import { EventData } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventbusService {
  private _subject = new Subject<EventData>();
  constructor() { }

  emit(event: EventData){
    this._subject.next(event);
  }

  on(eventName: string, action: any){
    return this._subject.pipe(
      filter((event: EventData) => event.name === eventName ),
      map((event: EventData) => event["value"])).subscribe(action)
  }
}
