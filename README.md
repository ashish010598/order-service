# 📦 Order Service Microservice

This is the **Order Service** microservice for an e-commerce system, responsible for handling order creation, updates, cancellations, and retrieving order details.

## 🚀 Features

- ✅ Create orders with multiple products
- 🔁 Update entire order status or specific product status
- ❌ Cancel one product or the whole order
- 🔐 JWT-based authentication via external **User Service**
- 📦 Containerized with Docker & Docker Compose
- 🧩 Clean MVC structure (Controller ➜ Service ➜ Model)

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based token validation
- **Architecture:** MVC (Model-View-Controller) pattern

---

## 🧑‍💻 Installation & Setup

### 📌 Prerequisites

Ensure you have the following installed:

- 🟢 Node.js (v18+)
- 🍃 MongoDB (locally or via MongoDB Atlas)
- 🐳 Docker + Docker Compose (for containerization)

### 📁 Clone the Repository

```sh
git clone <repository-url>
cd order-service
```

### 📦 Install Dependencies

```sh
npm install
```

### ⚙️ Configure Environment Variables

Create a `.env` file in the project root and configure it:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/orderdb
USER_SERVICE_URL=http://localhost:4000
JWT_SECRET=your_secret_key
```

### ▶️ Start the Server

```sh
npm start
```

Your service will run at:<br />
👉 http://localhost:5000

## 📨 API Endpoints

### 1. 🆕 Create an Order

**POST** `/api/orders`

#### Request Body:

```json
{
  "userId": "user_123",
  "products": [
    {
      "productName": "Product 1",
      "productId": "prod_1",
      "quantity": 1,
      "price": 100
    },
    {
      "productName": "Product 2",
      "productId": "prod_2",
      "quantity": 1,
      "price": 200
    }
  ]
}
```

#### Response:

```json
{
  "userId": "user_123",
  "products": [
    {
      "productName": "Product 1",
      "productId": "prod_1",
      "quantity": 1,
      "price": 100,
      "status": "pending",
      "_id": "67e7736e88e054822c38166f"
    },
    {
      "productName": "Product 2",
      "productId": "prod_2",
      "quantity": 1,
      "price": 200,
      "status": "pending",
      "_id": "67e7736e88e054822c381670"
    }
  ],
  "totalAmount": 300,
  "status": "pending",
  "_id": "67e7736e88e054822c38166e",
  "orderId": "e8277c3d-57c8-4645-82d4-3a8fcc47b360",
  "createdAt": "2025-03-29T04:13:34.442Z",
  "__v": 0
}
```

#### CURL:

```ssh
curl --location 'http://localhost:5000/orders' \
--header 'Authorization: Bearer sjkjbfsdbbfbbfjshbfjshdbfjsbfjshbfjshb' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "user_123",
    "products": [
        {
            "productName": "Product 1",
            "productId":"prod_1",
            "quantity": 1,
            "price": 100
        },
        {
            "productName": "Product 2",
            "productId": "prod_2",
            "quantity": 1,
            "price": 200
        }
    ]
}'
```

### 2.📄 Get Orders

**GET** `/api/orders`

#### Request Param

```json
{
  "userId": "user_123"
}
```

#### Response:

```json
[
  {
    "_id": "67e7736e88e054822c38166e",
    "userId": "user_123",
    "products": [
      {
        "productName": "Product 1",
        "productId": "prod_1",
        "quantity": 1,
        "price": 100,
        "status": "pending",
        "_id": "67e7736e88e054822c38166f"
      },
      {
        "productName": "Product 2",
        "productId": "prod_2",
        "quantity": 1,
        "price": 200,
        "status": "pending",
        "_id": "67e7736e88e054822c381670"
      }
    ],
    "totalAmount": 300,
    "status": "pending",
    "orderId": "e8277c3d-57c8-4645-82d4-3a8fcc47b360",
    "createdAt": "2025-03-29T04:13:34.442Z",
    "__v": 0
  }
]
```

#### CURL:

```ssh
curl --location 'http://localhost:5000/orders?userId=user_123' \
--header 'Authorization: Bearer hfsdjhfjsfbjsdfsdf'
```

### 3.✏️ Update Order/Product Status

**PUT** `/api/orders/:orderId`

#### Request Body (single product):

```json
{
  "userId": "user_123",
  "productId": "prod_1",
  "status": "in-transit"
}
```

#### Request Body (whole order):

```json
{
  "userId": "user_123",
  "status": "in-transit"
}
```

#### Response:

```json
{
  "message": "Order updated successfully",
  "order": {
    "_id": "67e7736e88e054822c38166e",
    "userId": "user_123",
    "products": [
      {
        "productName": "Product 1",
        "productId": "prod_1",
        "quantity": 1,
        "price": 100,
        "status": "Delivered",
        "_id": "67e7736e88e054822c38166f"
      },
      {
        "productName": "Product 2",
        "productId": "prod_2",
        "quantity": 1,
        "price": 200,
        "status": "in-transit",
        "_id": "67e7736e88e054822c381670"
      }
    ],
    "totalAmount": 300,
    "status": "in-transit",
    "orderId": "e8277c3d-57c8-4645-82d4-3a8fcc47b360",
    "createdAt": "2025-03-29T04:13:34.442Z",
    "__v": 0
  }
}
```

## 📁 Project Structure

```
order-service/
│-- controllers/
│   ├── orderController.js
│-- models/
│   ├── orderModel.js
│-- services/
│   ├── orderService.js
│-- middleware/
│   ├── authMiddleware.js
│-- routes/
│   ├── orderRoutes.js
│-- index.js
│-- .env
│-- package.json
│-- README.md
```

## 🐳 Docker Setup

### 📂 Create .dockerignore

```bash
node_modules
npm-debug.log
.env
```

### 📝 Dockerfile

```bash
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
```

### 🧩 docker-compose.yml

```bash
version: '3.8'

services:
  orderservice:
    build: .
    container_name: order-service
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/orderdb
      - USER_SERVICE_URL=http://host.docker.internal:4000
      - JWT_SECRET=your_secret_key
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    container_name: order-mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### ▶️ Run Docker Compose

```bash
docker-compose up --build
```

Your service will now run at: <br />
🌐 http://localhost:5000

## Notes

- The **User Service API** should be running for authentication to work.
- Token validation occurs before every request to ensure security.
- For all protected routes, include token like this:

```bash
-H "Authorization: Bearer <your_token>"
```

## 👤 Author

**Ashish Pathak**  
2024TM93035@wilp.bits-pilani.co.in <br />
[GitHub](https://github.com/ashish010598)

## 📝 License

This project is for educational purpose only. Made for Assignment submission for Course: **Scalable Services**
