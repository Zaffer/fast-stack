import { Component } from '@angular/core';
import { PINGService } from 'src/app/core/api/backend';
import { Scatter } from 'src/app/core/api/backend';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  public data: Scatter[] = [
    { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },
    // { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
  ]

  public graph = {
    data: this.data,
    layout: {
      margin: { t: 20, r: 20, b: 20, l: 20 },
      autosize: true,
    },
  };

  constructor(
    private ping: PINGService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.ping.pingV0PingGet().subscribe({
      next: (value) => {
        console.log(this.data);
        console.log(value);
        this.data = value;
        console.log(this.data);
      },
      error: err => {
        console.log(err);
      }
    })
  };
}
