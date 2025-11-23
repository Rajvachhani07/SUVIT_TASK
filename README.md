
# 🛍️ MultiVendor Hub

MultiVendor Hub is a full-stack web application that allows multiple vendors to manage products and track sales while users can browse, order, and track product purchases. The system ensures stock-safe ordering using atomic database operations and supports order cancellation with stock rollback.

This project was built as an interview assignment.

------------------------------------

## 🚀 Tech Stack

Frontend: React + Tailwind CSS  
Backend: Node.js + Express.js  
Database: MongoDB + Mongoose  
API Handling: Axios

------------------------------------

## 📂 Project Structure

/backend  
 ├── models  
 ├── controllers  
 ├── routes  
 ├── seed.js  
 └── server.js  

/frontend  
 ├── src  
     ├── pages  
     ├── components  
     ├── service  
     └── App.jsx  

------------------------------------

## 🧠 Core Features

Users:
- Browse products with live stock
- Place orders safely (prevents overselling)
- View order history
- Cancel orders (restores stock)

Vendors:
- View revenue & units sold per product
- View total orders and total sales
- Select vendor dynamically (no hardcoded ID)

System:
- Stock-safety with atomic DB update
- Transaction rollback on cancellation
- Aggregation pipeline for analytics

------------------------------------

## 🛢 Database Models

Vendor:  
- _id  
- name  
- email  

Product:  
- _id  
- vendorId  
- name  
- price  
- stockQty  
- description  

Order:  
- _id  
- productId  
- userId  
- qty  
- orderTime  
- status (PLACED | CANCELLED)

------------------------------------

## 🔥 Backend API Routes

Base URL:
http://localhost:5000/api

------------------------------------
PRODUCT ROUTES
------------------------------------
GET    /products                 → Get all products  
GET    /products/:id             → Get product by ID  
POST   /products                 → Add product

------------------------------------
ORDER ROUTES
------------------------------------
POST   /orders                   → Place order  
GET    /orders/user/:userId      → Get user order history  
POST   /orders/:id/cancel        → Cancel order & restore stock

Place Order Logic:
Uses findOneAndUpdate with stockQty >= qty to prevent overselling

Cancel Logic:
Updates order → CANCELLED and restores stock with transaction

------------------------------------
VENDOR ROUTES
------------------------------------
GET    /vendors                          → List all vendors  
GET    /vendors/:vendorId/dashboard      → Get vendor analytics

Analytics:
- totalQty sold
- totalRevenue (qty * price)
- totalOrders count

------------------------------------

## 🎨 Frontend Routes

/                           → Product List  
/order/:productId           → Place Order  
/orders                     → My Orders  
/vendors                    → Vendor List  
/vendor/:vendorId           → Vendor Dashboard

------------------------------------

## 🛠 How to Run

Backend:
cd backend  
npm install  
npm start  

Frontend:
cd frontend  
npm install  
npm run dev  

------------------------------------

## 🌱 Seed Data

Insert initial vendors/products:
node seed.js

------------------------------------

## ✔ Future Improvements

- Auth (Vendor + User Login)
- Real-time stock updates
- Admin inventory panel
- Charts for analytics

------------------------------------

## 📄 License

This project is for educational & interview purposes only.

------------------------------------

Developer: **Raj Vachhani**
Full-Stack Developer
