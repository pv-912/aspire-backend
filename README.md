## Aspire-backend

#### Run Locally

Clone the project

```bash
  git clone git@github.com:pv-912/aspire-backend.git
```

Go to the project directory

```bash
  cd aspire-backend/aspire-backend
```

copy the db.config
```bash
  cp app/config/db.config.js.temp app/config/db.config.js
```
Enter the DB details

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```

Attached the postman APIs documentation as **Aspire_postman.json**


## API Reference

```
Base Url: http://localhost:8080
```

#### Signin

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.|
| `email` | `string` | **Required**.|
| `contact` | `string` | **Required**.|
| `password` | `string` | **Required**.|
| `address` | `string` | |


#### Signin

```http
  POST /api/auth/signin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `contact` | `string` | **Required**.|
| `password` | `string` | **Required**.|


#### Approve Loan

```http
  POST /api/loan/approveLoan
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `loanId` | `integer` | **Required**.|
| `adminToken` | `string` | **Required**. In headers|

#### Fetch All loan

```http
  POST /api/customer/fetchLoan
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `loanId` | `integer` | **Required**.|
| `customerToken` | `string` | **Required**. In headers|


#### Add loan request

```http
  POST /api/customer/addLoanRequest
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `amount` | `integer` | **Required**.|
| `terms` | `integer` | **Required**. |
| `customerToken` | `string` | **Required**. In headers|



#### Pay installment

```http
  POST /api/customer/repayment
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `loanId` | `integer` | **Required**.|
| `amount` | `integer` | **Required**.|
| `status` | `ENUM` | **Required**. |
| `customerToken` | `string` | **Required**. In headers|



## Tech Stack

**Server:** Node, Express
**DB:** MySQL
**ORM:** Sequelize
