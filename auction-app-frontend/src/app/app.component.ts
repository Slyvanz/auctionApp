import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SpinnerService} from "./services/spinner.service";
import {AuthService} from "./services/auth.service";
import {take} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[SpinnerService]
})
export class AppComponent implements OnInit {
  title = 'auction-app-frontend';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.reloadAuth();
  }
}

