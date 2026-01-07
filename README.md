# 👜 Bagify – Bag Shopping Web Application

LINK: [Bagify Website Frontend](https://mern-bag-selling-project.onrender.com)

Bagify is a **full-stack eCommerce web application** for buying and managing bags online.  
It is built using the **MERN Stack** and provides a smooth shopping experience for users along with a powerful admin panel for managing products and orders.

---

## 🚀 Tech Stack Used

This project is developed using the **MERN Stack**:

- **MongoDB** – Database  
- **Express.js** – Backend framework  
- **React.js** – Frontend library  
- **Node.js** – Server environment  
- **Stripe** – Payment Gateway  

---

## 📌 Project Flow

The application is divided into two main parts:

- **Admin Panel**
- **User Interface**

---

## 🛠️ Admin Panel Features

### ➕ Add Products
Admin can add new products using the **Add Items** section by providing:
- Product Image  
- Product Name  
- Product Category  
- MRP  
- Price  

### 📋 Manage Products
- View all listed products  
- Update product details  
- Remove products from the database  

### 📦 Manage Orders
- View all customer orders  
- Update order status:
  - **Processing** (default)
  - **Out for Delivery**
  - **Delivered**

---

## 👤 User Features

### 🛍️ Browse Products
- View all available products  
- Filter products by category  

### 🔐 Authentication
- User registration  
- User login with valid credentials
- Taken is saved in localstorage 

### 🛒 Cart Management
- Add products using the **“+”** button  
- Remove products using the **“-”** button  
- View total items, quantity, and price  

### 💳 Checkout & Payment
- Review cart summary with delivery charges  
- Enter delivery details:
  - First Name  
  - Last Name  
  - Email Address  
  - Street  
  - City  
  - State  
  - Pincode  
  - Country  
  - Phone Number  

- Proceed to payment via **Stripe**
- View complete order summary on Stripe payment page  

### ❌ Payment Cancellation
- If payment is cancelled, order is saved with `payment = false` in the database  

### ✅ Successful Payment
- User is redirected to **My Orders** page  
- Track order status in real time  

---

## 📦 My Orders
- View all placed orders  
- Track order status:
  - Processing  
  - Out for Delivery  
  - Delivered  

---

## 💳 Stripe Test Card Details

Use the following test card for Stripe payments:

- **Card Number:** `4000 0035 6000 0008`  
- **Expiry Date:** Any future date  
- **CVV:** Any 3 digits  

---

## ✨ Conclusion

Bagify is a complete MERN-based eCommerce solution featuring:
- Secure authentication  
- Product & order management  
- Real-time order tracking  
- Stripe payment integration  

Feel free to fork, improve, or use this project for learning and portfolio purposes 🚀
