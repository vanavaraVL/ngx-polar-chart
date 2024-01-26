import {Component} from '@angular/core';
import {DataSetService} from '../../services/data-set.service';

@Component({
  selector: 'app-dataset-generator',
  templateUrl: './data-generator.component.html',
  styleUrls: ['./data-generator.component.scss'],
})
export class DataSetGeneratorComponent {
  constructor(private dataSetService: DataSetService) {}

  public generateNewData(): void {
    this.dataSetService.generateSamples();
  }
}
