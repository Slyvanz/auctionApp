import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-deneme',
  templateUrl: './deneme.component.html',
  styleUrls: ['./deneme.component.css']
})
export class DenemeComponent {
  @Output()
  private eventEmitter = new EventEmitter();

  constructor(public authService: AuthService) {
  }

  event() {
    this.eventEmitter.emit();
  }
}
