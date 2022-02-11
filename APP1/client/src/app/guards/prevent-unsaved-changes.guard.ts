import { MemberEditComponent } from './../member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent):boolean {
    if (component.editForm.dirty) {
      return confirm("Are U sure you want to continue? any unsaved changes will be lost... dude!")
    }
    return true;
  }

}
