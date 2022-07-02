import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { IUser } from 'src/app/models/IUser';

@Component({
  // selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent implements OnInit {

  updateSeelectedRoles = new EventEmitter();
  user: IUser;
  roles: any[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  updateRoles() {
    this.updateSeelectedRoles.emit(this.roles);
    this.bsModalRef.hide();

  }

}
