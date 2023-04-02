import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IonicModule } from "@ionic/angular";
import { MarkerPopoverComponent } from "./marker-popover/marker-popover.component";
import { MapPopoverComponent } from "./map-popover/map-popover.component";
import { QrCodeGeneratorComponent } from "./qr-code-generator/qr-code-generator.component";
import { FloorsPopoverComponent } from "./floors-popover/floors-popover.component";
import { RouterModule } from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule
  ],
  declarations: [
    QrCodeGeneratorComponent,
    MarkerPopoverComponent,
    FloorsPopoverComponent,
    MapPopoverComponent
  ],
  exports: [
    QrCodeGeneratorComponent,
    MarkerPopoverComponent,
    FloorsPopoverComponent
  ]
})

export class ComponentsModule { }
