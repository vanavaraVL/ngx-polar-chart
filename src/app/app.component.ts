import {Component, OnInit} from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    Date.prototype.toISOString = function () {
      return moment(this).format('YYYY-MM-DDTHH:mm:ss');
    };
  }
}
