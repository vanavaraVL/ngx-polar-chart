import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbComponent {
  @Input()
  public currentSample: string = '';

  @Input()
  public previousRoute?: string;
}
