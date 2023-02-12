import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessRoutingModule } from './access-routing.module';
import { UsersComponent } from './users/users.component';
import { AccessComponent } from './access.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { GroupsComponent } from './groups/groups.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';


@NgModule({
  declarations: [
    UsersComponent,
    AccessComponent,
    GroupsComponent,
    RolesComponent,
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    AccessRoutingModule,
    MaterialModule,
  ]
})
export class AccessModule { }
