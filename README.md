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
PORT=3002
# MONGO_URI=mongodb://localhost:27017/orderdb
MONGO_URI=mongodb://admin:admin@host.docker.internal:27017
USER_SERVICE_URL=http://localhost:4000
JWT_SECRET=your_secret_key
```

### ▶️ Start the Server

```sh
npm start
```

Your service will run at:<br />
👉 http://localhost:3002

## 📨 API Endpoints

### 1. 🆕 Create an Order

**POST** `/api/orders`

#### Request Body:

```json
{
  "userId": "user_123",
  "products": [
    {
      "name": "LG Refrigerator",
      "productId": "ELREF_01",
      "quantity": 1,
      "price": 17500,
      "description": "100Ltr LG Single Door Refrigerator",
      "image": "https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/gl-d201abeu/gallery/promotion-offer/thum-1600x1062.jpeg/_jcr_content/renditions/thum-1600x1062.jpeg",
      "category": "ELECTRONICS"
    },
    {
      "name": "Refigerator Cover",
      "productId": "ELPHER_01",
      "quantity": 1,
      "price": 480,
      "description": "Cover for 100ltr refrigerator",
      "image": "https://m.media-amazon.com/images/I/51JIaUJJnhL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      "category": "ELECTRONIC_PERIPHERAL"
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
      "name": "LG Refrigerator",
      "productId": "ELREF_01",
      "quantity": 1,
      "price": 17500,
      "status": "pending",
      "description": "100Ltr LG Single Door Refrigerator",
      "image": "https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/gl-d201abeu/gallery/promotion-offer/thum-1600x1062.jpeg/_jcr_content/renditions/thum-1600x1062.jpeg",
      "category": "ELECTRONICS",
      "_id": "68176a7e033a0588c7f26f37"
    },
    {
      "name": "Refigerator Cover",
      "productId": "ELPHER_01",
      "quantity": 1,
      "price": 480,
      "status": "pending",
      "description": "Cover for 100ltr refrigerator",
      "image": "https://m.media-amazon.com/images/I/51JIaUJJnhL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      "category": "ELECTRONIC_PERIPHERAL",
      "_id": "68176a7e033a0588c7f26f38"
    }
  ],
  "totalAmount": 17980,
  "status": "pending",
  "_id": "68176a7e033a0588c7f26f36",
  "orderId": "2f6492c2-21d9-4041-9cbd-4d2e96294ad5",
  "createdAt": "2025-05-04T13:24:14.975Z",
  "__v": 0
}
```

#### CURL:

```ssh
curl --location 'http://localhost:3002/orders' \
--header 'Authorization: Bearer sjkjbfsdbbfbbfjshbfjshdbfjsbfjshbfjshb' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "user_123",
    "products": [
        {
            "name": "LG Refrigerator",
            "productId":"ELREF_01",
            "quantity": 1,
            "price": 17500,
            "description":"100Ltr LG Single Door Refrigerator",
            "image":"https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/gl-d201abeu/gallery/promotion-offer/thum-1600x1062.jpeg/_jcr_content/renditions/thum-1600x1062.jpeg",
            "category":"ELECTRONICS"
        },
        {
            "name": "Refigerator Cover",
            "productId": "ELPHER_01",
            "quantity": 1,
            "price": 480,
            "description": "Cover for 100ltr refrigerator",
            "image": "https://m.media-amazon.com/images/I/51JIaUJJnhL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            "category": "ELECTRONIC_PERIPHERAL"
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
    "_id": "68176936033a0588c7f26f32",
    "userId": "user_123",
    "products": [
      {
        "name": "Thinkpad Laptop",
        "productId": "ELLAP_01",
        "quantity": 1,
        "price": 7500,
        "status": "pending",
        "description": "Thinkpad laptop with 16GB RAM and 1TB Storage",
        "image": "https://p2-ofp.static.pub//fes/cms/2024/03/20/0xbcadobdac1lq59yhjwmzngsft11s006858.png",
        "category": "COMPUTERS",
        "_id": "68176936033a0588c7f26f33"
      },
      {
        "name": "ThinkVision Monitor",
        "productId": "ELMON_03",
        "quantity": 1,
        "price": 12200,
        "status": "pending",
        "description": "ThinkVision 27inch LED 4k Monitor",
        "image": "https://p3-ofp.static.pub/ShareResource/560x450/Monitors/63B4GAR6US/63B4GAR6US-560x450-01.png",
        "category": "COMPUTERS_PERIPHERAL",
        "_id": "68176936033a0588c7f26f34"
      }
    ],
    "totalAmount": 19700,
    "status": "pending",
    "orderId": "d373a867-95c1-4442-a234-41b16b484b4f",
    "createdAt": "2025-05-04T13:18:46.619Z",
    "__v": 0
  },
  {
    "_id": "68176a7e033a0588c7f26f36",
    "userId": "user_123",
    "products": [
      {
        "name": "LG Refrigerator",
        "productId": "ELREF_01",
        "quantity": 1,
        "price": 17500,
        "status": "pending",
        "description": "100Ltr LG Single Door Refrigerator",
        "image": "https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/gl-d201abeu/gallery/promotion-offer/thum-1600x1062.jpeg/_jcr_content/renditions/thum-1600x1062.jpeg",
        "category": "ELECTRONICS",
        "_id": "68176a7e033a0588c7f26f37"
      },
      {
        "name": "Refigerator Cover",
        "productId": "ELPHER_01",
        "quantity": 1,
        "price": 480,
        "status": "pending",
        "description": "Cover for 100ltr refrigerator",
        "image": "https://m.media-amazon.com/images/I/51JIaUJJnhL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        "category": "ELECTRONIC_PERIPHERAL",
        "_id": "68176a7e033a0588c7f26f38"
      }
    ],
    "totalAmount": 17980,
    "status": "pending",
    "orderId": "2f6492c2-21d9-4041-9cbd-4d2e96294ad5",
    "createdAt": "2025-05-04T13:24:14.975Z",
    "__v": 0
  }
]
```

#### CURL:

```ssh
curl --location 'http://localhost:3002/orders?userId=user_123' \
--header 'Authorization: Bearer hfsdjhfjsfbjsdfsdf'
```

### 3.✏️ Update Order/Product Status

**PUT** `/api/orders/:orderId`

#### Request Body (single product):

```json
{
  "userId": "user_123",
  "productId": "ELLAP_01",
  "status": "shipped"
}
```

#### Response (Single product)

```json
{
  "message": "Order updated successfully",
  "order": {
    "_id": "68176936033a0588c7f26f32",
    "userId": "user_123",
    "products": [
      {
        "name": "Thinkpad Laptop",
        "productId": "ELLAP_01",
        "quantity": 1,
        "price": 7500,
        "status": "shipped",
        "description": "Thinkpad laptop with 16GB RAM and 1TB Storage",
        "image": "https://p2-ofp.static.pub//fes/cms/2024/03/20/0xbcadobdac1lq59yhjwmzngsft11s006858.png",
        "category": "COMPUTERS",
        "_id": "68176936033a0588c7f26f33"
      },
      {
        "name": "ThinkVision Monitor",
        "productId": "ELMON_03",
        "quantity": 1,
        "price": 12200,
        "status": "pending",
        "description": "ThinkVision 27inch LED 4k Monitor",
        "image": "https://p3-ofp.static.pub/ShareResource/560x450/Monitors/63B4GAR6US/63B4GAR6US-560x450-01.png",
        "category": "COMPUTERS_PERIPHERAL",
        "_id": "68176936033a0588c7f26f34"
      }
    ],
    "totalAmount": 19700,
    "status": "pending",
    "orderId": "d373a867-95c1-4442-a234-41b16b484b4f",
    "createdAt": "2025-05-04T13:18:46.619Z",
    "__v": 0
  }
}
```

#### curl

```ssh
curl --location --request PUT 'http://localhost:3002/orders/d373a867-95c1-4442-a234-41b16b484b4f' \
--header 'Authorization: Bearer sdajsbjsdfhbsjbfsdfsdfsdfsds' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "user_123",
    "productId": "ELLAP_01",
    "status":"shipped"
}'
```

#### Request Body (whole order):

```json
{
  "userId": "user_123",
  "status": "delivered"
}
```

#### Response (whole order):

```json
{
  "message": "Order updated successfully",
  "order": {
    "_id": "68176936033a0588c7f26f32",
    "userId": "user_123",
    "products": [
      {
        "name": "Thinkpad Laptop",
        "productId": "ELLAP_01",
        "quantity": 1,
        "price": 7500,
        "status": "delivered",
        "description": "Thinkpad laptop with 16GB RAM and 1TB Storage",
        "image": "https://p2-ofp.static.pub//fes/cms/2024/03/20/0xbcadobdac1lq59yhjwmzngsft11s006858.png",
        "category": "COMPUTERS",
        "_id": "68176936033a0588c7f26f33"
      },
      {
        "name": "ThinkVision Monitor",
        "productId": "ELMON_03",
        "quantity": 1,
        "price": 12200,
        "status": "delivered",
        "description": "ThinkVision 27inch LED 4k Monitor",
        "image": "https://p3-ofp.static.pub/ShareResource/560x450/Monitors/63B4GAR6US/63B4GAR6US-560x450-01.png",
        "category": "COMPUTERS_PERIPHERAL",
        "_id": "68176936033a0588c7f26f34"
      }
    ],
    "totalAmount": 19700,
    "status": "delivered",
    "orderId": "d373a867-95c1-4442-a234-41b16b484b4f",
    "createdAt": "2025-05-04T13:18:46.619Z",
    "__v": 0
  }
}
```

#### curl

```ssh
curl --location --request PUT 'http://localhost:3002/orders/d373a867-95c1-4442-a234-41b16b484b4f' \
--header 'Authorization: Bearer sdajsbjsdfhbsjbfsdfsdfsdfsds' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "user_123",
    "status":"delivered"
}'
```

### 4.❌ Cancelled/🔁 Returned Order/Product

**PUT** `/api/orders/:orderId/privilegeStatus`

#### Request Body (single product):

```json
{
  "userId": "user_123",
  "productId": "ELREF_01",
  "status": "cancelled"
}
```

#### Response (Single Product)

```json
{
  "message": "Order updated successfully",
  "order": {
    "_id": "68176a7e033a0588c7f26f36",
    "userId": "user_123",
    "products": [
      {
        "name": "LG Refrigerator",
        "productId": "ELREF_01",
        "quantity": 1,
        "price": 17500,
        "status": "cancelled",
        "description": "100Ltr LG Single Door Refrigerator",
        "image": "https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/gl-d201abeu/gallery/promotion-offer/thum-1600x1062.jpeg/_jcr_content/renditions/thum-1600x1062.jpeg",
        "category": "ELECTRONICS",
        "_id": "68176a7e033a0588c7f26f37"
      },
      {
        "name": "Refigerator Cover",
        "productId": "ELPHER_01",
        "quantity": 1,
        "price": 480,
        "status": "pending",
        "description": "Cover for 100ltr refrigerator",
        "image": "https://m.media-amazon.com/images/I/51JIaUJJnhL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        "category": "ELECTRONIC_PERIPHERAL",
        "_id": "68176a7e033a0588c7f26f38"
      }
    ],
    "totalAmount": 17980,
    "status": "pending",
    "orderId": "2f6492c2-21d9-4041-9cbd-4d2e96294ad5",
    "createdAt": "2025-05-04T13:24:14.975Z",
    "__v": 0
  }
}
```

#### curl

```ssh
curl --location --request PUT 'http://localhost:3002/orders/2f6492c2-21d9-4041-9cbd-4d2e96294ad5/privilegeStatus' \
--header 'Authorization: Bearer asjdasjbbsfsdfsdf' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "user_123",
    "productId": "ELREF_01",
    "status":"cancelled"
}'
```

#### Request Body (whole order):

```json
{
  "userId": "user_123",
  "status": "cancelled"
}
```

#### Response (whole order):

```json
{
  "message": "Order updated successfully",
  "order": {
    "_id": "68176a7e033a0588c7f26f36",
    "userId": "user_123",
    "products": [
      {
        "name": "LG Refrigerator",
        "productId": "ELREF_01",
        "quantity": 1,
        "price": 17500,
        "status": "cancelled",
        "description": "100Ltr LG Single Door Refrigerator",
        "image": "https://www.lg.com/content/dam/channel/wcms/in/images/refrigerators/gl-d201abeu/gallery/promotion-offer/thum-1600x1062.jpeg/_jcr_content/renditions/thum-1600x1062.jpeg",
        "category": "ELECTRONICS",
        "_id": "68176a7e033a0588c7f26f37"
      },
      {
        "name": "Refigerator Cover",
        "productId": "ELPHER_01",
        "quantity": 1,
        "price": 480,
        "status": "cancelled",
        "description": "Cover for 100ltr refrigerator",
        "image": "https://m.media-amazon.com/images/I/51JIaUJJnhL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        "category": "ELECTRONIC_PERIPHERAL",
        "_id": "68176a7e033a0588c7f26f38"
      }
    ],
    "totalAmount": 17980,
    "status": "cancelled",
    "orderId": "2f6492c2-21d9-4041-9cbd-4d2e96294ad5",
    "createdAt": "2025-05-04T13:24:14.975Z",
    "__v": 0
  }
}
```

#### curl

```ssh
curl --location --request PUT 'http://localhost:3002/orders/2f6492c2-21d9-4041-9cbd-4d2e96294ad5/privilegeStatus' \
--header 'Authorization: Bearer asjdasjbbsfsdfsdf' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "user_123",
    "status":"cancelled"
}'
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
EXPOSE 3002
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
      - "3002:3002"
    environment:
      - PORT=3002
      # - MONGO_URI=mongodb://mongo:27017/orderdb
      - mongodb://admin:admin@host.docker.internal:27017
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
🌐 http://localhost:3002

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

This project is intended for educational purposes only.<br/>
Built for the assignment submission for the course:<br/>
**Scalable Services (BITS Pilani WILP)** 👨‍🏫
