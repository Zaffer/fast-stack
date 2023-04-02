import { NgModule } from '@angular/core';

import { PlotlyViaCDNModule } from 'angular-plotly.js';

PlotlyViaCDNModule.setPlotlyVersion('latest');
PlotlyViaCDNModule.setPlotlyBundle('basic');

@NgModule({
  exports: [
    PlotlyViaCDNModule,
  ]
})
export class PlotsModule { }
