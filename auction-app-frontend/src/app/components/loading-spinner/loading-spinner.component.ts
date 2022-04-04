import {Component} from '@angular/core';
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  constructor(public spinnerService: SpinnerService) {
  }
}
