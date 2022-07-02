import { IUser } from 'src/app/models/IUser';
import { take } from 'rxjs';
import { AccountService } from './../services/account.service';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  user: IUser | null;
  @Input() appHasRole: string[];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(
      take(1)).subscribe(user => {
        this.user = user;
      }
    );
  }

  ngOnInit(): void {
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }

    if (this.user.roles?.some(r => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
