# Angular-Personal-Project [Eco-Friendly Fashion Store](https://github.com/VitoPhW/Angular-Personal-Project)

"Eco-Friendly Fashion Store" is an online shop of aesthetic style clothes of long-term fashion with recycling ability.

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

## Project requirements
### SQL
-    [SQL Lite Database](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/app1.db)
-    [Users table](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Entities/AppUser.cs)
-    [CRUD Users](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Data/UserRepository.cs), [CRUD Products](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Data/ProductRepository.cs), [CRUD Category](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Data/CategoryRepository.cs)
-    [Join Users-LikedProduct](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Data/LikeRepository.cs)
-    [Database auto-creation](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Data/Seed.cs)
-    [Required parameters + MaxLength (Product)](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Entities/Product.cs)
### Client side
-    Journey levels [Products list](https://github.com/VitoPhW/Angular-Personal-Project#store-page) - [Products details](https://github.com/VitoPhW/Angular-Personal-Project#product-details)
-    [Home page](https://github.com/VitoPhW/Angular-Personal-Project#store-page)
-    [Navigation bar](https://github.com/VitoPhW/Angular-Personal-Project#store)
-    Footer - NA
-    Alt - NA
-    [About](https://github.com/VitoPhW/Angular-Personal-Project#about)
-    [Log in](https://github.com/VitoPhW/Angular-Personal-Project#welcome-screen)
-    [Registration](https://github.com/VitoPhW/Angular-Personal-Project#registration)
-    [Information/error pop-up (authentication toastr)](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/client/src/app/guards/auth.guard.ts)
-    CRUD client side - [Create product](https://github.com/VitoPhW/Angular-Personal-Project#new-product-tab), [Update product, create/update/delete photo](https://github.com/VitoPhW/Angular-Personal-Project#product-edit---photo-editor-tab)
-    [Move to details page](https://github.com/VitoPhW/Angular-Personal-Project#product-details)
-    Search - NA
-    [Components structure](https://github.com/VitoPhW/Angular-Personal-Project/tree/main/APP1/client/src/app)
-    Clear Console - Done
-    [Filter (Products)](https://github.com/VitoPhW/Angular-Personal-Project#store)
-    [Division into pages](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/client/src/app/app-routing.module.ts)
-    [Data validation](https://github.com/VitoPhW/Angular-Personal-Project#registration---data-validation)
-    [Call httpClient](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/client/src/app/services/account.service.ts)
-    [Use ngx-bootstrap](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/client/package.json)
-    [Use font-awesome](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/client/package.json)
-    [Redirect to 404](https://github.com/VitoPhW/Angular-Personal-Project#404-page)
### Server side
-    [Web API](https://github.com/VitoPhW/Angular-Personal-Project/tree/main/APP1/API)
-    [OOP](https://github.com/VitoPhW/Angular-Personal-Project/tree/main/APP1/API/Interfaces)
-    [Controllers](https://github.com/VitoPhW/Angular-Personal-Project/tree/main/APP1/API/Controllers), [Repositories](https://github.com/VitoPhW/Angular-Personal-Project/tree/main/APP1/API/Data)
-    Design patterns - [Unit of work](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Data/UnitOfWork.cs), [Repository](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Data/ProductRepository.cs)
-    Configuration files - Not synced, contains sensitive information
-    [JWT Token](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Extensions/IdentityServiceExtensions.cs)
-    [Data validation](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Middleware/ExceptionMiddleware.cs)
### Bonus
-    [Logging (Identity Asp.Net Core)](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Entities/AppUser.cs)
-    [External API](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Helpers/CloudinarySettings.cs)

#### Out of scope
-    Delete user.
-    Category management (frontend).
-    Edit another user's details, by Admin.
-    View my previous orders.
-    View my liked products.
-    Add product to shopping cart.
-	Check out (placing an order), as a registered user.
-	Payment process.

#### [SQL Database](https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/API/Data)
-   AspNetRoles - User type (Admin, Assistant, Customer).
-   AspNetUserRoles - Roles attached to users (Many-to-many).
-   AspNetUsers - Users.
-   Category - Gategory of product (One-to-many).
-   Likes - Products liked by users (Many-to-many).
-   Photos - Product images (One-to-many).
-   Product - Products.

#### Pages
-    [Welcome](https://github.com/VitoPhW/Angular-Personal-Project#welcome-screen) - Welcome page, first screen on website opening.
-    [Registration](https://github.com/VitoPhW/Angular-Personal-Project#registration) - Sign in page, to create new customer.
-    [Store](https://github.com/VitoPhW/Angular-Personal-Project#store-page) - Store page, products list with filtering and sorting.
-    [Product details](https://github.com/VitoPhW/Angular-Personal-Project#product-details) - Product details screen.
-    [About](https://github.com/VitoPhW/Angular-Personal-Project#about) - About page.
-    [Store](https://github.com/VitoPhW/Angular-Personal-Project#store) - Store page, Admin/Assistant view.
-    [Product edit](https://github.com/VitoPhW/Angular-Personal-Project#product-edit---photo-editor-tab) - Product edit page (Admin/Assistant only).
-    [Edit roles tab](https://github.com/VitoPhW/Angular-Personal-Project#edit-roles-tab) - Admin panel, roles management (Admin only).
-    [New Product tab](https://github.com/VitoPhW/Angular-Personal-Project#new-product-tab) - Admin panel, new product form (Admin only).

### Customer view
#### Welcome screen
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20First%20page.png"
     alt="Welcome"
     width="800px"
     style="float: left; margin-right: 10px;" />
     
#### Registration
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20Registration%20page.png"
     alt="Registration"
     width="800px"
     style="float: left; margin-right: 10px;" />
     
#### Registration - data validation
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20Registration%20page%20-%20with%20validation%20errors.png"
     alt="Registration - data validation"
     width="800px"
     style="float: left; margin-right: 10px;" />
     
#### Store page
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20Store%20(by%20Customer).png"
     alt="Store"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### Product details
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20Product%20details%20(by%20Customer).png"
     alt="Product details"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### About
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20About.png"
     alt="About"
     width="800px"
     style="float: left; margin-right: 10px;" />

### Admin/Assistant view
#### Store
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20Store%20(by%20Admin%20or%20Assistant).png"
     alt="Store - Admin or Assistant view"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### Product edit - Photo editor tab
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20edit%20Product%20-%20Photo%20editor%20tab%20(by%20Admin%20or%20Assistant).png"
     alt="Product edit - Photo editor"
     width="800px"
     style="float: left; margin-right: 10px;" />

#### Edit roles tab
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20Admin%20panel%20-%20Edit%20Roles%20tab%20-%20edit%20roles%20for%20..%20(by%20Admin).png"
     alt="Edit roles tab - Admin panel"
     width="800px"
     style="float: left; margin-right: 10px;" />
          
#### New product tab
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20Admin%20panel%20-%20New%20Product%20tab%20(by%20Admin).png"
     alt="New product tab - Admin panel"
     width="800px"
     style="float: left; margin-right: 10px;" />
     
#### 404 page
<img src="https://github.com/VitoPhW/Angular-Personal-Project/blob/main/APP1/assets/Screenshots/APP%20-%20404.png"
     alt="404 page"
     width="800px"
     style="float: left; margin-right: 10px;" />
