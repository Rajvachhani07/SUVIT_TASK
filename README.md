
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

## ✔ ScreenShots

<img width="1365" height="646" alt="Screenshot_1" src="https://github.com/user-attachments/assets/72338b62-1147-4249-90fd-705f96d01f82" />
<img width="1353" height="645" alt="Screenshot_2" src="https://github.com/user-attachments/assets/46f713e3-b25c-4ce6-9891-32ff10d5fc75" />
<img width="1359" height="638" alt="Screenshot_3" src="https://github.com/user-attachments/assets/310e5159-a088-4024-991b-2d5c5c0fa53f" />
<img width="1354" height="635" alt="Screenshot_4" src="https://github.com/user-attachments/assets/c92f560f-42c2-4a30-9b9f-02f1c39b12e1" />





------------------------------------

## 📄 License

This project is for educational & interview purposes only.

------------------------------------

Developer: **Raj Vachhani**
Full-Stack Developer
