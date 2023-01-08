import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {

  public webSrvUrl = environment._WEB_SRV_BASE_PATH + ''

  // // example using a pipe with content from api
  // managUrl = this.companyId$.pipe(
  //   map(companyId => {
  //     console.log(`${environment.QRS_V1_PATH}/dash/quickbutton/management/${companyId}`);
  //     console.log(`Email::: ${this.profileEmail}`)
  //     // console.log(`User role::: ${this.userRole$}`)
  //     return `${environment.QRS_V1_PATH}/dash/quickbutton/management/${companyId}`;
  //   })
  // );


}
