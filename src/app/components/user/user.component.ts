import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {

  @Input() users: User[]=[];
  
  @Output() idUserEventEmitter = new EventEmitter();

  onRemoveUSer(id: number):void{
    this.idUserEventEmitter.emit(id);
  }
}
