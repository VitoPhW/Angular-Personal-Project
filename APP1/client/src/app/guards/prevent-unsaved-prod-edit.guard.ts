import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from '../products/product-edit/product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedProdEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(component: ProductEditComponent):boolean {
    if (component.editForm.dirty) {
      return confirm("Are U sure you want to continue? any unsaved changes will be lost... dude!")
    }
    return true;
  }

}
