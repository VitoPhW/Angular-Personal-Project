import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: Partial<IUser[]> = [];
  bsModalRef: BsModalRef;

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserWithRoles();
  }
  getUserWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users: Partial<IUser[]>)=> {
      this.users = users;
      console.log(users);
    });
  }

  openRolesModal (user: IUser) {
    const config  = {
      class: 'modal-dialog-centered',
      initialState: {
        username: user.username,
        token: user.token,
        roles: this.getRolesArray(user),
      }
    };

    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any[]) => {
      const roleValues = values.filter(el => el.checked).map(el => el.name);
      if (roleValues.length) {
        this.adminService.updateUserRoles(user.username, roleValues).subscribe(() => {
          user.roles = roleValues;
        }, error => {
          console.log(error);
        });
      } else {
        this.toastr.error(`User ${user.username} can't be with no roles!`);
      }
    })
  }

  getRolesArray(user: IUser) {
    const roles: any[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'Assistant', value: 'Assistant' },
      { name: 'Customer', value: 'Customer' },
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (userRole === role.value) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    });
    return roles;
  }
}
