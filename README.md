# Angular-Personal-Project [Eco-Friendly Fashion Store](https://github.com/VitoPhW/Angular-Personal-Project)

"Tal ve Yuval ve" is an online shop of aesthetic style clothes of long-term fashion with recycling ability.

### Description
An online shop, managed by administrator and assistants. Products can be updated by assistants or admin. The product can be bought by registered customer. Customer can like products and view it details.

### Features
-	Online Registration/Login/Logout.
-	Login data encryption.
-    All products view.
-    Filter products list.
-    Change order of products list.
-    List of products separated by pages.
-    Open product details.
-    Like/unlike product.
-    View which products are liked by customer or other user.
-    View who liked particular product.
-    Edit my profile.
-    Edit users roles Admin/Assistant/Customer (by Admin only).
-    Create new product (by Admin only).
-    View users and user's details (by Admin and Assistant).
-    Edit products (by Admin and Assistant).

### Supported user journeys

#### Admin only
-	Accounts role management.
-	Create product.

#### Assistant and Admin
-	Edit product details.

#### Customer
-	Browsing through the available products, with filtering and sorting.
-	View product details.
-	Register as a customer.
-    Log in.
-    Log out.
-    Edit profile.

### Out of scope
-    Delete user.
-    Create category.
-    View my previous orders.
-    View my liked products.
-    Edit another user's details.
-    Add product to shopping cart.
-	Check out (placing an order), as a registered user.
-	Payment process.

### Implemented

-	C# .NET | backend
-	Angular | frontend
-	Entity Framework (EF) Core .NET | database management
-    Identity .NET | sign in / log in / user roles
-    SQL Lite | database
-    bootswatch | UI design theme ([Current is Minty](https://bootswatch.com/minty/))
-    font-awesome | product / user card buttons icon
-    @angular/forms | sign in / new product forms, filled data validation, navigation bar
-    ng2-file-upload | product images upload to Cloudinary
-    ngx-bootstrap | buttons, modals, pagination, dropdown, timepicker, tabs
-    ngx-gallery | view product images
-    ngx-spinner | database transaction loading animation
-    ngx-toastr | information pop-up messages
-    rxjs | reactive programming (Observable)
-    Cloudinary | cloud media library
-    Exception handling backend | ExceptionMiddleware.cs, ApiException.cs
-    Exception handling frontend | 
-    Design Patterns | Unit of work, Repositories



#### [SQL Database (../ProjectElements/DatabaseCreationQuery)](https://github.com/VitoPhW/HackerU-Middle_Project-OnlineShop/tree/master/ProjectElements/DatabaseCreationQuery)
-   AspNetRoles - User type (Admin, Assistant, Customer).
-   AspNetUserRoles - Roles attached to users (Many-to-many).
-   AspNetUsers - Users.
-   Category - Gategory of product (One-to-many).
-   Likes - Products liked by users (Many-to-many).
-   Photos - Product images (One-to-many).
-   Product - Products.

#### SQL diagram
<img src="https://github.com/VitoPhW/HackerU-Middle_Project-OnlineShop/blob/master/ProjectElements/OnlineShop_SQL-Diagram.png"
     alt="Online Shop - SQL Diagram"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### WPF screens
-    MainWindow - Home page, first screen on application opening.
-    MyOrders - Customer's screen for his/her orders review.
-    MyAccount - Customer's screen for his/her account review.
-    Inventory - (Admin/Assistant only) Inventory management.
-    Admistartion - (Admin only) Screen for management of users and orders.
-    LoginOrSignUp - Screen of login or registration action.

#### Homepage screen
<img src="https://github.com/VitoPhW/HackerU-Middle_Project-OnlineShop/blob/master/ProjectElements/OnlineShop_Homepage.png"
     alt="Homepage scree"
     width="800px"
     style="float: left; margin-right: 10px;" />
     
 #### My Orders screen
<img src="https://github.com/VitoPhW/HackerU-Middle_Project-OnlineShop/blob/master/ProjectElements/OnlineShop_MyOrders.png"
     alt="Homepage scree"
     width="800px"
     style="float: left; margin-right: 10px;" />
     
 #### My Account screen
<img src="https://github.com/VitoPhW/HackerU-Middle_Project-OnlineShop/blob/master/ProjectElements/OnlineShop_MyAccount.png"
     alt="Homepage scree"
     width="500px"
     style="float: left; margin-right: 10px;" />
     
 #### Inventory screen
<img src="https://github.com/VitoPhW/HackerU-Middle_Project-OnlineShop/blob/master/ProjectElements/OnlineShop_Inventory.png"
     alt="Homepage scree"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### Administration
<img src="https://github.com/VitoPhW/HackerU-Middle_Project-OnlineShop/blob/master/ProjectElements/OnlineShop_Administration.png"
     alt="Homepage scree"
     width="800px"
     style="float: left; margin-right: 10px;" />
     
 #### Sign up/Sign in screen
<img src="https://github.com/VitoPhW/HackerU-Middle_Project-OnlineShop/blob/master/ProjectElements/OnlineShop_SignIn.Up.png"
     alt="Homepage scree"
     width="200px"
     style="float: left; margin-right: 10px;" />

