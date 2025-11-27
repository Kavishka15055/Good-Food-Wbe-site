
# Good Food Restaurant - Online Food Ordering System
![goodfood Home Page](https://github.com/user-attachments/assets/1f08acad-9e01-4fdc-9521-82c70221ab78)


**Modern Food Delivery Platform**

A comprehensive web application for Good Food Restaurant that provides a seamless online food ordering experience with real-time cart management, order tracking, and delivery services. The platform enhances customer satisfaction through intuitive design and efficient service delivery.

---

## 🍕 Features

- **User Management**
  - Secure Authentication - User registration and login system
  - Profile Management - Personal information and delivery addresses
  - Order History - Complete order tracking and status updates
  
- **Menu & Ordering**
  - Menu - Categorized food items with search and filtering
  - Shopping Cart - Add, remove, and manage items with quantity controls
  - Real-time Cart Updates - Synchronized cart across all devices
  
- **Order Management**
  - Secure Checkout - Multiple payment options (Card/Cash on Delivery)
  - Order Tracking - Real-time order status updates
  - Delivery Management - Address validation and delivery tracking
  
- **Restaurant Features**
  - Location Services - Interactive map with restaurant location
  - Responsive Design - Optimized for desktop, tablet, and mobile devices
  - Admin Dashboard - Order management and inventory tracking

---

## Technologies Used

### **Frontend**
- **React.js** - Component-based UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icons
- **Leaflet ** - Interactive maps
- **AOS ** - Scroll animations

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MySQL** - Relational database management
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### **Database**
- **MySQL** - Primary database


---

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js >= 16.0
- MySQL >= 8.0
- npm or yarn package manager

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/good-food-restaurant.git
   cd good-food-restaurant
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Database Setup**
   Create MySQL database:
   ```env
   mysql -u root -p
   CREATE DATABASE good_food;
   EXIT;
   ```

5. ** Environment Configuration**
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=good_food
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

6. **Database Migration**
   Run database migrations
   ```bash
   cd backend
   npm run migrate
   ```
6. **Start the application**
   Start backend server (Terminal 1)
   ```bash
   cd backend
    node server.js
   ```
   Start frontend development server (Terminal 2)
   ```bash
   npm run dev
   ```

---

## 👥 Default User Roles

### **Customer**
-  Browse menu and add items to cart
-  Place orders and track delivery
-  Manage personal profile and address

---
### **Admin (Future Implementation)**
- Manage menu items and inventory
- Process orders and update status
- View analytics and reports

---


## 📁 Project Structure

```
good-food-restaurant/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── profileController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── profileRoutes.js
│   ├── db.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── login.jsx
│   │   │   │   └── signup.jsx
│   │   │   ├── Menu/
│   │   │   │   └── MenuPage.jsx
│   │   │   ├── Cart/
│   │   │   │   ├── CartPage.jsx
│   │   │   │   └── EmptyCart.jsx
│   │   │   ├── Profile/
│   │   │   │   └── ProfilePage.jsx
│   │   │   ├── Orders/
│   │   │   │   └── OrdersPage.jsx
│   │   │   ├── Checkout/
│   │   │   │   └── CheckoutPage.jsx
│   │   │   ├── Location/
│   │   │   │   └── LocationMap.jsx
│   │   │   └── Shared/
│   │   │       └── PrimaryButton.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── assets/
│   │   └── App.jsx
│   └── public/
└── README.md
```

---

## 🍽️ Menu Categories

The application uses a custom authentication system with the following features:

- **Starters & Appetizers**: Spring Rolls, Garlic Bread, Bruschetta
- **Soups**: Tomato Basil, Chicken Noodle, Cream of Mushroom
- **Salads**: Caesar, Greek, Caprese, Garden Fresh
- **Main Course**: Grilled Chicken, Pasta, Pizza, Indian Specialties
- **Burgers & Sandwiches**: Beef Burger, Veggie Burger, Club Sandwich

---

## 🔐 Authentication System
The application features a secure authentication system with:

- **User Registration**: Email, password, and personal details
- **Login System**: Secure session management
- **Password Hashing**: bcryptjs for secure password storage
- **Protected Routes**: Authentication-required pages
- **Local Storage**:  Persistent user sessions

---

## 💳 Payment Options

- **Credit/Debit Card**:  Secure card payments
- **Cash on Delivery**: Pay when food is delivered

---
## 📱 Responsive Design

- **Mobile-First Approach **: Optimized for mobile devices
- **Tablet Compatibility **: Responsive layouts for tablets
- **Desktop Optimization  **: Enhanced experience on larger screens

---

*© 2025 |  Good Food Restaurant |  Fresh Meals, Delivered with Love*
