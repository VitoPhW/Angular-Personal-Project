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
-    List of products separated by pages (pagination).
-    View product details.
-    Like/unlike product.
-    View which products are liked by customer or other user.
-    View who liked particular product.
-    Edit my profile.
-    Edit users roles Admin/Assistant/Customer (by Admin only).
-    Create new product (by Admin only).
-    View users and user's details (by Admin and Assistant).
-    Edit products (by Admin and Assistant).

#### Admin only
-	View user roles.
-	Edit user roles.
-	Create product.

#### Assistant and Admin
-	Edit product details.
-	Add/remove product's photos.
-	Set main photo.
-	View users list.
-	View user's details.

#### Customer
-	Browsing through the available products, with filtering and sorting.
-	View product details.
-	Like/unlike a product.
-	Register as a customer.
-    Log in.
-    Log out.
-    Edit profile.

### Implemented
-	C# .NET | backend
-	Angular | frontend
-	Entity Framework (EF) Core .NET | database management
-    Identity .NET | sign in / log in / user roles
-    SQL Lite | database
-    bootswatch | UI design theme ([current is Minty](https://bootswatch.com/minty/))
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
-    Exception handling frontend | error.interceptor.ts, ../errors/..
-    Design Patterns | Unit of work, Repositories

### Out of scope
-    Delete user.
-    Category management.
-    Edit another user's details, by Admin.
-    View my previous orders.
-    View my liked products.
-    Add product to shopping cart.
-	Check out (placing an order), as a registered user.
-	Payment process.

#### [SQL Database](https://github.com/VitoPhW/Angular-Personal-Project/blob/Branch-16--Unit-of-Work-pattern/APP1/API/Data)
-   AspNetRoles - User type (Admin, Assistant, Customer).
-   AspNetUserRoles - Roles attached to users (Many-to-many).
-   AspNetUsers - Users.
-   Category - Gategory of product (One-to-many).
-   Likes - Products liked by users (Many-to-many).
-   Photos - Product images (One-to-many).
-   Product - Products.

#### Pages
-    [Welcome](https://github.com/VitoPhW/Angular-Personal-Project/edit/Branch-16--Unit-of-Work-pattern/README.md#welcome-screen) - Welcome page, first screen on website opening.
-    [Registration](https://github.com/VitoPhW/Angular-Personal-Project/edit/Branch-16--Unit-of-Work-pattern/README.md#registration) - Sign in page, to create new customer.
-    [Store](https://github.com/VitoPhW/Angular-Personal-Project/edit/Branch-16--Unit-of-Work-pattern/README.md#store-page) - Store page, products list with filtering and sorting.
-    [Product details](https://github.com/VitoPhW/Angular-Personal-Project/edit/Branch-16--Unit-of-Work-pattern/README.md#product-details) - Product details screen.
-    [About](https://github.com/VitoPhW/Angular-Personal-Project/edit/Branch-16--Unit-of-Work-pattern/README.md#about) - About page.
-    [Store](https://github.com/VitoPhW/Angular-Personal-Project/edit/Branch-16--Unit-of-Work-pattern/README.md#store) - Store page, Admin/Assistant view.
-    [Product edit](https://github.com/VitoPhW/Angular-Personal-Project/edit/Branch-16--Unit-of-Work-pattern/README.md#product-edit---photo-editor-tab) - Product edit page (Admin/Assistant only).
-    [Edit roles tab](https://github.com/VitoPhW/Angular-Personal-Project/edit/Branch-16--Unit-of-Work-pattern/README.md#edit-roles-tab) - Admin panel, roles management (Admin only).
-    [New Product tab](https://github.com/VitoPhW/Angular-Personal-Project/edit/Branch-16--Unit-of-Work-pattern/README.md#new-product-tab) - Admin panel, new product form (Admin only).

### Customer view
#### Welcome screen
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/Branch-16--Unit-of-Work-pattern/APP1/assets/Screenshots/APP%20-%20First%20page.png"
     alt="Welcome"
     width="800px"
     style="float: left; margin-right: 10px;" />
     
#### Registration
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/Branch-16--Unit-of-Work-pattern/APP1/assets/Screenshots/APP%20-%20Registration%20page.png"
     alt="Registration"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### Store page
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/Branch-16--Unit-of-Work-pattern/APP1/assets/Screenshots/APP%20-%20Store%20(by%20Customer).png"
     alt="Store"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### Product details
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/Branch-16--Unit-of-Work-pattern/APP1/assets/Screenshots/APP%20-%20Product%20details%20(by%20Customer).png"
     alt="Product details"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### About
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/Branch-16--Unit-of-Work-pattern/APP1/assets/Screenshots/APP%20-%20About.png"
     alt="About"
     width="800px"
     style="float: left; margin-right: 10px;" />

### Admin/Assistant view
#### Store
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/Branch-16--Unit-of-Work-pattern/APP1/assets/Screenshots/APP%20-%20Store%20(by%20Admin%20or%20Assistant).png"
     alt="Store - Admin or Assistant view"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### Product edit - Photo editor tab
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/Branch-16--Unit-of-Work-pattern/APP1/assets/Screenshots/APP%20-%20edit%20Product%20-%20Photo%20editor%20tab%20(by%20Admin%20or%20Assistant).png"
     alt="Product edit - Photo editor"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### Edit roles tab
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/Branch-16--Unit-of-Work-pattern/APP1/assets/Screenshots/APP%20-%20Admin%20panel%20-%20Edit%20Roles%20tab%20-%20edit%20roles%20for%20..%20(by%20Admin).png"
     alt="Edit roles tab - Admin panel"
     width="800px"
     style="float: left; margin-right: 10px;" />
     
     
#### New product tab
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/Branch-16--Unit-of-Work-pattern/APP1/assets/Screenshots/APP%20-%20Admin%20panel%20-%20New%20Product%20tab%20(by%20Admin).png"
     alt="New product tab - Admin panel"
     width="800px"
     style="float: left; margin-right: 10px;" />
