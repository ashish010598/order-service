# Order Service Microservice

This is the **Order Service** microservice for an e-commerce system, responsible for handling order creation, updates, cancellations, and retrieving order details.

## Features

- Create an order with multiple products
- Update global order status or specific product status
- Cancel a single product or the entire order
- Authenticate users via token validation with the User Service

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based token validation
- **Architecture:** MVC (Model-View-Controller) pattern

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v18+)
- MongoDB (running locally or via Atlas)
- npm or yarn

### Clone the Repository

```sh
git clone <repository-url>
cd order-service
```

### Install Dependencies

```sh
npm install
```

### Environment Variables

Create a `.env` file in the project root and configure it:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/orderdb
USER_SERVICE_URL=http://localhost:4000
JWT_SECRET=your_secret_key
```

### Start the Server

```sh
npm start
```

## API Endpoints

### 1️⃣ Create an Order

**POST** `/api/orders`

#### Request Body:

```json
{
  "userId": "user123",
  "products": [
    { "productId": "prod1", "quantity": 2 },
    { "productId": "prod2", "quantity": 1 }
  ]
}
```

#### Response:

```json
{
  "orderId": "order123",
  "status": "Pending",
  "products": [
    { "productId": "prod1", "quantity": 2, "status": "Pending" },
    { "productId": "prod2", "quantity": 1, "status": "Pending" }
  ]
}
```

### 2️⃣ Get Orders

**POST** `/api/orders/list`

#### Request Body:

```json
{
  "userId": "user123"
}
```

#### Response:

```json
[
  {
    "orderId": "order123",
    "status": "Pending",
    "products": [
      { "productId": "prod1", "quantity": 2, "status": "Pending" },
      { "productId": "prod2", "quantity": 1, "status": "Pending" }
    ]
  }
]
```

### 3️⃣ Update Order Status

**PUT** `/api/orders/update`

#### Request Body:

```json
{
  "orderId": "order123",
  "status": "Shipped"
}
```

#### Response:

```json
{
  "orderId": "order123",
  "status": "Shipped",
  "products": [
    { "productId": "prod1", "quantity": 2, "status": "Shipped" },
    { "productId": "prod2", "quantity": 1, "status": "Shipped" }
  ]
}
```

### 4️⃣ Cancel a Product or Order

**PUT** `/api/orders/cancel`

#### Request Body (Cancel Single Product):

```json
{
  "orderId": "order123",
  "productId": "prod1"
}
```

#### Request Body (Cancel Entire Order):

```json
{
  "orderId": "order123"
}
```

#### Response:

```json
{
  "message": "Order/Product canceled successfully"
}
```

## Project Structure

```
order-service/
│-- controllers/
│   ├── orderController.js
│-- models/
│   ├── orderModel.js
│-- services/
│   ├── orderService.js
│   ├── userService.js
│-- middleware/
│   ├── authMiddleware.js
│-- routes/
│   ├── orderRoutes.js
│-- index.js
│-- .env
│-- package.json
│-- README.md
```

## Notes

- The **User Service API** should be running for authentication to work.
- Token validation occurs before every request to ensure security.

## Author

**Ashish Pathak**  
2024TM93035@wilp.bits-pilani.co.in
Your GitHub: [YourGitHub](https://github.com/ashish010598)

## License

This project is licensed under the MIT License.
