import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
    
  
  
  private _newUserEmitter: EventEmitter<User> = new EventEmitter();
  private _idUserEventEmitter = new EventEmitter();

  constructor() { }

  get newUserEmitter() : EventEmitter<User>{
    return this._newUserEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number>{
    return this._idUserEventEmitter;
  }


}
