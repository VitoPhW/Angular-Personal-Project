import { Observable } from 'rxjs';
import { ShoppingCartParams } from './../../models/shoppingCartParams';
import { IShoppingCart } from './../../models/IShoppingCart';
import { Component, OnInit } from '@angular/core';
import { IPagination } from 'src/app/models/IPagination';
import { MembersService } from 'src/app/services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-shopping-cart',
  templateUrl: './member-shopping-cart.component.html',
  styleUrls: ['./member-shopping-cart.component.css']
})
export class MemberShoppingCartComponent implements OnInit {

  shoppingCart: IShoppingCart[];
  pagination: IPagination;
  shoppingCartParams: ShoppingCartParams;
  shoppingCartCount$: Observable<number>;

  constructor(private membersService: MembersService, private toastr: ToastrService) {
    this.shoppingCartParams = new ShoppingCartParams();
    this.shoppingCartCount$ = this.membersService.shoppingCartCount$;
  }

  ngOnInit(): void {
    this.loadShoppingCart();
  }

  loadShoppingCart() {
    this.membersService.ShoppingCartParams = this.shoppingCartParams;
    this.membersService.getShoppingCart(this.shoppingCartParams).subscribe(
      res => {
        this.shoppingCart = res.result;
        this.pagination = res.pagination;
      }
    )
  }

  pageChanged({ page }: any) {
    this.shoppingCartParams.pageNumber = page;
    this.membersService.ShoppingCartParams = this.shoppingCartParams;
    this.loadShoppingCart();
  }

  setCartItem(productId: number, quantity: number) {
    this.updateLocalItemQuantity(productId, quantity);

    this.membersService.setCartItem(productId, quantity).subscribe(
      res => {
        if (res == null) this.loadShoppingCart();
        else {
          this.updateLocalItemQuantity(productId, res);
        }
      }
    )
  }

  updateLocalItemQuantity(productId: number, quantity: number) {
    const item = this.shoppingCart.find(item => item.productID == productId);
    if (item) item.quantity = quantity;
  }

  checkout() {
    this.membersService.checkout().subscribe(() => {
      this.toastr.success(`Thank you for buying in our store!`);
    this.loadShoppingCart();
    });
  }
}
