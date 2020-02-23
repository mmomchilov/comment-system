import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export class ContainerCommunication {
  private updates: Subject<any>;

  constructor() {
    this.init();
  }

  init() {
    this.updates = new Subject<any>();
  }

  changeConfiguration(event) {
    this.updates.next(event);
  }

  updatesForId(id: string): Observable<any> {
    return this.updates
      .pipe(
        filter(update => update.id === id)
      )
      ;
  }

}
