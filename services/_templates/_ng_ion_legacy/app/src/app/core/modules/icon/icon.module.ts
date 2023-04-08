import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';

import { faBolt, faBuilding, faCalendar, faCalendarDays, faClock, faCoffee, faHouse, faLayerGroup, faMap, faMaximize, faMinimize, faRightFromBracket, faTablet } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
})
export class IconModule { 
  constructor(faConfig: FaConfig, library: FaIconLibrary,) {
    // Add an icon to the library for convenient access in other components
    // faConfig.defaultPrefix = 'fas';
    faConfig.fixedWidth = true;
    library.addIcons(
      faCoffee, 
      faHouse, 
      faMap, 
      faCalendar, 
      faTablet, 
      faLayerGroup,
      faCalendarDays,
      faTablet,
      faRightFromBracket,
      faMaximize,
      faMinimize,
      faBuilding,
      faBolt,
      faClock
    );
  }
}
