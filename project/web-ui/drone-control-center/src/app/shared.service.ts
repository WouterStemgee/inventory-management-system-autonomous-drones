import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isHandset$;

  @Output() onNavigateEvent = new EventEmitter<string>();

  constructor() {
  }
}
