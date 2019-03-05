import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  @Output() onNavigateEvent = new EventEmitter<string>();

  constructor() {
  }
}
