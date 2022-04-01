import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-deneme',
  templateUrl: './deneme.component.html',
  styleUrls: ['./deneme.component.css']
})
export class DenemeComponent{


  @Output()
  private eventEmitter = new EventEmitter();

  event(){
    this.eventEmitter.emit();
  }
  constructor(public authService: AuthService) { }


}
