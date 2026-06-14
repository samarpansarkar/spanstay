# SpanStay — Developer Documentation

> A full-stack hotel booking platform with role-based access control, real-time Redis caching, Stripe payments, and Cloudinary image management.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [Repository Structure](#4-repository-structure)
5. [Environment Variables](#5-environment-variables)
6. [Getting Started](#6-getting-started)
7. [Backend — API Reference](#7-backend--api-reference)
   - [Authentication](#71-authentication-apiv1auth)
   - [Hotels](#72-hotels-apiv1hotels)
   - [Bookings](#73-bookings-apiv1bookings)
   - [Payments](#74-payments-apiv1payments)
8. [Data Models](#8-data-models)
9. [Role-Based Access Control](#9-role-based-access-control)
10. [Backend Architecture Patterns](#10-backend-architecture-patterns)
11. [Frontend Architecture](#11-frontend-architecture)
12. [Security Implementation](#12-security-implementation)
13. [Caching Strategy](#13-caching-strategy)
14. [Payment Flow](#14-payment-flow)
15. [Docker Setup](#15-docker-setup)
16. [Middleware Reference](#16-middleware-reference)
17. [Admin and Approval Workflow](#17-admin-and-approval-workflow)
18. [User Support System](#18-user-support-system)
19. [UI Skeleton Loading System](#19-ui-skeleton-loading-system)

---

## 1. Project Overview

**SpanStay** is a hotel booking web application that enables:

- **Users** to browse hotels, make bookings, and pay securely via Stripe.
- **Hotel Admins** to list hotels, manage their properties, confirm or cancel bookings.
- **Platform Admins** to oversee all content and users.

The project is split into two independent workspaces:
- `backend/` — Node.js/Express REST API
- `vite-frontend/` — React 19 SPA (Vite + TailwindCSS)

---

## 2. Tech Stack

### Backend

| Category | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Framework | Express 5 |
| Database | MongoDB (via Mongoose 9) |
| Caching | Redis 7 |
| Authentication | JWT (Access + Refresh token rotation) |
| Payments | Stripe |
| Image Storage | Cloudinary |
| File Uploads | Multer + multer-storage-cloudinary |
| Validation | Zod |
| API Docs | Swagger (OpenAPI 3.0 via swagger-jsdoc) |
| Security | Helmet, HPP, CORS, express-rate-limit |
| Logging | Morgan |
| Containerization | Docker + Docker Compose |

### Frontend

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | TailwindCSS 4 |
| State Management | Redux Toolkit |
| Routing | React Router DOM 7 |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Animations | Framer Motion |
| Payments | @stripe/stripe-js |
| Notifications | Sonner |
| Icons | Lucide React |
| Date Utilities | date-fns |

---

## 3. Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│              React 19 SPA  (Vite + TailwindCSS)     │
└────────────────────────┬────────────────────────────┘
                         │  HTTP / REST
                         ▼
┌─────────────────────────────────────────────────────┐
│              Express 5 API  (Node.js ESM)            │
│                                                     │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌───────┐ │
│  │  Auth   │  │  Hotels  │  │Bookings │  │Payment│ │
│  │ Module  │  │  Module  │  │ Module  │  │Module │ │
│  └────┬────┘  └────┬─────┘  └────┬────┘  └───┬───┘ │
│       └────────────┴─────────────┴────────────┘     │
│                         │                           │
│         ┌───────────────┼───────────────┐           │
│         ▼               ▼               ▼           │
│    ┌─────────┐    ┌──────────┐    ┌──────────┐      │
│    │ MongoDB │    │  Redis   │    │ Cloudinary│      │
│    │ (data)  │    │ (cache)  │    │  (images)│      │
│    └─────────┘    └──────────┘    └──────────┘      │
│                                                     │
│         Stripe Webhooks ◄──────────────────────────►│
└─────────────────────────────────────────────────────┘
```

---

## 4. Repository Structure

```
spanstay/
├── backend/
│   ├── src/
│   │   ├── app.js                  # Express app configuration
│   │   ├── server.js               # Server entry point
│   │   ├── config/
│   │   │   ├── db.js               # MongoDB connection
│   │   │   ├── redis.js            # Redis client
│   │   │   ├── stripe.js           # Stripe initialization
│   │   │   ├── cloudinary.js       # Cloudinary configuration
│   │   │   ├── swagger.js          # OpenAPI/Swagger spec
│   │   │   └── cookieOptions.js    # Cookie configuration
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.js
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.service.js
│   │   │   │   ├── auth.repository.js
│   │   │   │   ├── auth.validation.js
│   │   │   │   └── user.model.js
│   │   │   ├── hotel/
│   │   │   │   ├── hotel.routes.js
│   │   │   │   ├── hotel.controller.js
│   │   │   │   ├── hotel.service.js
│   │   │   │   ├── hotel.repository.js
│   │   │   │   ├── hotel.validation.js
│   │   │   │   └── hotel.model.js
│   │   │   ├── booking/
│   │   │   │   ├── booking.routes.js
│   │   │   │   ├── booking.controller.js
│   │   │   │   ├── booking.service.js
│   │   │   │   ├── booking.repository.js
│   │   │   │   ├── booking.validation.js
│   │   │   │   └── booking.model.js
│   │   │   └── payment/
│   │   │       ├── payment.routes.js
│   │   │       ├── payment.controller.js
│   │   │       └── payment.service.js
│   │   ├── routes/
│   │   │   └── index.js            # Central route aggregator
│   │   ├── shared/
│   │   │   ├── constants/
│   │   │   │   └── role.js         # ROLES enum
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.js       # JWT verification
│   │   │   │   ├── authorize.middleware.js  # Role-based guard
│   │   │   │   ├── error.middleware.js      # Global error handler
│   │   │   │   ├── fileUpload.middleware.js # Multer + Cloudinary
│   │   │   │   ├── rateLimit.middleware.js  # Rate limiting
│   │   │   │   └── validate.middleware.js   # Zod request validation
│   │   │   ├── utils/
│   │   │   │   ├── AppError.js             # Custom error class
│   │   │   │   ├── generateToken.js        # JWT helpers
│   │   │   │   └── clearHotelCache.js      # Redis cache invalidation
│   │   │   └── validators/
│   │   │       └── hotel.validation.js     # Shared param schemas
│   │   └── seeders/                        # Database seed scripts
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
│
└── vite-frontend/
    ├── src/
    │   ├── main.jsx                # App entry point
    │   ├── App.jsx                 # Root routing
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── SigninPage.jsx
    │   │   │   └── SignupPage.jsx
    │   │   └── users/
    │   │       └── UsersProfilePage.jsx
    │   ├── components/
    │   │   ├── auth/               # Auth-specific components
    │   │   ├── shared/             # Reusable shared components
    │   │   └── ui/                 # UI primitives
    │   ├── redux/
    │   │   ├── api/                # RTK Query API slices
    │   │   └── features/
    │   │       └── auth/
    │   │           ├── authSlice.js
    │   │           └── authSelectors.js
    │   ├── routes/
    │   │   ├── ProtectedRoute.jsx  # Auth guard
    │   │   └── PublicRoute.jsx     # Public route guard
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   └── useInitializeAuth.js
    │   ├── layouts/                # Page layout wrappers
    │   ├── schemas/                # Zod validation schemas
    │   ├── service/                # Axios API service layer
    │   ├── animations/             # Framer Motion variants
    │   ├── constants/              # App-wide constants
    │   ├── lib/                    # Utility libraries
    │   └── utils/                  # Helper functions
    └── package.json
```

---

## 5. Environment Variables

### `backend/.env`

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `4000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/spanstay` |
| `REDIS_URL` | Redis connection URL | `redis://localhost:6379` |
| `JWT_ACCESS_SECRET` | JWT access token secret | `your_access_secret` |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | `your_refresh_secret` |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiry | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `7d` |
| `CLIENT_URL` | Frontend origin for CORS | `http://localhost:5173` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_api_secret` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...` |
| `PAYMENT_SUCCESS_URL` | Redirect URL on payment success | `http://localhost:5173/payment/success` |
| `PAYMENT_CANCEL_URL` | Redirect URL on payment cancel | `http://localhost:5173/payment/cancel` |

### `vite-frontend/.env`

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:4000/api/v1` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` |

---

## 6. Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 8
- Docker & Docker Compose (for local infrastructure)

### Option A — Docker (Recommended for infrastructure)

```bash
# 1. Clone the repository
git clone <repo-url>
cd spanstay

# 2. Start MongoDB + Redis via Docker
cd backend
docker-compose up -d mongodb redis

# 3. Install backend dependencies and start dev server
pnpm install
pnpm dev

# 4. In a new terminal, install frontend and start
cd ../vite-frontend
pnpm install
pnpm dev
```

### Option B — Full Docker (Backend + infrastructure)

```bash
cd backend
docker-compose up --build
```

### Option C — Manual local setup

Ensure MongoDB (port `27017`) and Redis (port `6379`) are running locally, then:

```bash
# Backend
cd backend && pnpm install && pnpm dev

# Frontend (new terminal)
cd vite-frontend && pnpm install && pnpm dev
```

### Default Ports

| Service | Port |
|---|---|
| Backend API | `4000` |
| Frontend Dev Server | `5173` |
| MongoDB | `27017` |
| Redis | `6379` |
| Swagger UI | `http://localhost:4000/api-docs` |

---

## 7. Backend — API Reference

> **Base URL:** `http://localhost:4000/api/v1`
>
> All protected routes require the `Authorization: Bearer <accessToken>` header.
>
> Interactive API documentation is available at **`/api-docs`** (Swagger UI).

---

### 7.1 Authentication (`/api/v1/auth`)

#### `POST /auth/register`
Register a new user account.

- **Access:** Public
- **Rate Limited:** Yes

**Request Body:**
```json
{
  "name": "Samarpan Sarkar",
  "email": "samarpan@gmail.com",
  "password": "Password@123"
}
```

**Responses:**
| Status | Description |
|---|---|
| `201` | Registration successful |
| `409` | User already exists |
| `422` | Validation error |

---

#### `POST /auth/signin`
Sign in with email and password.

- **Access:** Public
- **Rate Limited:** Yes

**Request Body:**
```json
{
  "email": "samarpan@gmail.com",
  "password": "Password@123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "...",
    "name": "Samarpan Sarkar",
    "email": "samarpan@gmail.com",
    "role": "user"
  },
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

**Responses:**
| Status | Description |
|---|---|
| `200` | Signin successful |
| `401` | Invalid credentials |
| `404` | User not found |

---

#### `POST /auth/logout`
Logout current user. Invalidates the stored refresh token.

- **Access:** Protected (any authenticated user)

**Responses:**
| Status | Description |
|---|---|
| `200` | Logout successful |
| `401` | Unauthorized |

---

#### `GET /auth/user-profile`
Fetch the authenticated user's profile.

- **Access:** Protected
- **Rate Limited:** Yes

**Response (200):**
```json
{
  "id": "...",
  "name": "Samarpan Sarkar",
  "email": "samarpan@gmail.com",
  "role": "user",
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

---

#### `POST /auth/refresh-token`
Rotate access + refresh tokens using a valid refresh token.

- **Access:** Public (refresh token required in body or cookie)
- **Rate Limited:** Yes

**Responses:**
| Status | Description |
|---|---|
| `200` | New tokens issued |
| `401` | Invalid or expired refresh token |

---

### 7.2 Hotels (`/api/v1/hotels`)

#### `POST /hotels/register-hotels`
Register a new hotel listing with images.

- **Access:** Protected — `admin`, `hotelAdmin`
- **Content-Type:** `multipart/form-data`

**Form Fields:**
| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Hotel name |
| `description` | string | ✅ | Hotel description |
| `location` | string | ✅ | Hotel location |
| `price` | number | ✅ | Price per night (INR) |
| `images` | file[] | ✅ | Up to 5 images (uploaded to Cloudinary) |
| `amenities` | string[] | ❌ | List of amenities |

**Responses:**
| Status | Description |
|---|---|
| `201` | Hotel registered successfully |
| `400` | Validation error |
| `401` | Unauthorized |
| `403` | Forbidden (insufficient role) |

---

#### `GET /hotels`
Fetch all hotels with optional filters, search, and pagination.

- **Access:** Public

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `search` | string | Full-text search across title, description, location |
| `location` | string | Filter by location (case-insensitive regex) |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `sortBy` | string | Field to sort by (e.g., `price`, `createdAt`) |
| `sortOrder` | string | `asc` or `desc` (default: `desc`) |
| `page` | number | Page number (default: `1`) |
| `limit` | number | Results per page (default: `10`) |

**Response (200):**
```json
{
  "hotels": [...],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

> Results are cached in Redis for **60 seconds** per unique query combination.

---

#### `GET /hotels/my-hotels`
Fetch hotels owned by the current hotel admin.

- **Access:** Protected — `hotelAdmin`

---

#### `GET /hotels/my-approvals`
Fetch approval requests for hotels owned by the current hotel admin.

- **Access:** Protected — `hotelAdmin`

---

#### `GET /hotels/:hotelId`
Fetch a single hotel by its MongoDB ObjectId.

- **Access:** Public

**Responses:**
| Status | Description |
|---|---|
| `200` | Hotel fetched successfully |
| `404` | Hotel not found |

---

#### `PATCH /hotels/:hotelId`
Update hotel details. Only the hotel owner can perform this action.

- **Access:** Protected — `admin`, `hotelAdmin` (owner only)

**Request Body (all fields optional):**
```json
{
  "title": "Updated Name",
  "description": "Updated description",
  "location": "Mumbai",
  "price": 6000
}
```

**Responses:**
| Status | Description |
|---|---|
| `200` | Hotel updated successfully |
| `401` | Unauthorized |
| `403` | Forbidden (not the owner) |
| `404` | Hotel not found |

---

#### `DELETE /hotels/:hotelId`
Delete a hotel. Only the hotel owner or a platform admin can delete.

- **Access:** Protected — `hotelAdmin` (owner) or `admin`

**Responses:**
| Status | Description |
|---|---|
| `200` | Hotel deleted successfully |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Hotel not found |

---

### 7.3 Bookings (`/api/v1/bookings`)

#### `POST /bookings`
Create a new hotel booking.

- **Access:** Protected — `user` role only

**Request Body:**
```json
{
  "hotelId": "685f7c5f4a9d8e1a23d9a111",
  "checkIn": "2026-08-10",
  "checkOut": "2026-08-15",
  "guests": 2
}
```

**Business Rules:**
- `checkIn` must be before `checkOut`
- Conflict detection prevents double-bookings for the same hotel and date range
- `totalPrice` is auto-calculated as `totalNights × hotel.price`
- Initial status: `pending`, paymentStatus: `pending`

**Responses:**
| Status | Description |
|---|---|
| `201` | Booking created successfully |
| `400` | Validation error |
| `401` | Unauthorized |
| `404` | Hotel not found |
| `409` | Hotel already booked for selected dates |

---

#### `GET /bookings/my-bookings`
Retrieve all bookings for the currently authenticated user.

- **Access:** Protected — `user` role only

**Response (200):**
```json
[
  {
    "_id": "...",
    "hotel": { "title": "...", "location": "..." },
    "checkIn": "2026-08-10T00:00:00.000Z",
    "checkOut": "2026-08-15T00:00:00.000Z",
    "guests": 2,
    "totalPrice": 22500,
    "status": "pending",
    "paymentStatus": "pending"
  }
]
```

---

#### `GET /bookings/hotel-bookings`
Fetch all bookings for hotels owned by the current hotel admin.

- **Access:** Protected — `hotelAdmin` role only

---

#### `PATCH /bookings/:bookingId/cancel`
Cancel a booking.

- **Access:** Protected — `user` (booking owner) or `hotelAdmin` (hotel owner)

**Responses:**
| Status | Description |
|---|---|
| `200` | Booking cancelled successfully |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Booking not found |
| `409` | Booking already cancelled |

---

#### `PATCH /bookings/:bookingId/confirm`
Confirm a booking. Must be the hotel admin who owns the booked hotel.

- **Access:** Protected — `hotelAdmin` (hotel owner only)

**Responses:**
| Status | Description |
|---|---|
| `200` | Booking confirmed successfully |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Booking not found |
| `409` | Booking already confirmed or cancelled |

---

### 7.4 Payments (`/api/v1/payments`)

#### `POST /payments/checkout/:bookingId`
Create a Stripe Checkout session for a pending booking.

- **Access:** Protected (booking owner only)

**Response (200):**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

**Responses:**
| Status | Description |
|---|---|
| `200` | Stripe session created |
| `401` | Unauthorized |
| `403` | Forbidden (not the booking owner) |
| `404` | Booking not found |

---

#### `POST /payments/webhook`
Stripe webhook receiver. Handles `checkout.session.completed` events.

- **Access:** Public (verified via Stripe signature)

> ⚠️ This endpoint requires the **raw request body** for Stripe signature verification. It is exempt from `express.json()` body parsing and uses the raw buffer instead.

**Behavior on `checkout.session.completed`:**
- Sets `booking.paymentStatus = 'paid'`
- Sets `booking.status = 'confirmed'`
- Stores `booking.paymentIntentId`

---

#### `GET /payments/verify/:sessionId`
Verify a Stripe checkout session and check payment status.

- **Access:** Protected (Authenticated users)

---

### 7.5 Reviews (`/api/v1/reviews`)

#### `GET /reviews/:hotelId`
Fetch all reviews for a specific hotel.

- **Access:** Public

#### `POST /reviews/:hotelId`
Create a new review for a hotel.

- **Access:** Protected (Authenticated users)

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent stay!"
}
```

---

### 7.6 Admin (`/api/v1/admin`)

#### `GET /admin/users`
Fetch all users.

- **Access:** Protected — `admin` role only

#### `PATCH /admin/users/:id`
Update a user's details or role.

- **Access:** Protected — `admin` role only

#### `DELETE /admin/users/:id`
Delete a user.

- **Access:** Protected — `admin` role only

#### `GET /admin/approvals`
Fetch all pending hotel approval requests.

- **Access:** Protected — `admin` role only

#### `PATCH /admin/approvals/:id/resolve`
Approve or reject a hotel request.

- **Access:** Protected — `admin` role only

**Request Body:**
```json
{
  "status": "APPROVED"
}
```

#### `GET /admin/logs`
Fetch system logs.

- **Access:** Protected — `admin` role only

---

### 7.7 Support (`/api/v1/support`)

#### `POST /support`
Create a new support ticket.

- **Access:** Protected (Authenticated users)

**Request Body:**
```json
{
  "subject": "Payment issue",
  "message": "I was charged twice."
}
```

#### `GET /support/my-tickets`
Fetch all tickets for the authenticated user.

- **Access:** Protected (Authenticated users)

#### `GET /support`
Fetch all support tickets.

- **Access:** Protected — `admin` role only

#### `PATCH /support/:id/resolve`
Resolve a support ticket.

- **Access:** Protected — `admin` role only

**Request Body:**
```json
{
  "adminResponse": "Refund processed."
}
```

---

## 8. Data Models

### User

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required, 3–50 chars |
| `email` | String | Required, unique, lowercase |
| `password` | String | Required, min 6 chars, `select: false`, bcrypt-hashed |
| `role` | String (enum) | `user` \| `admin` \| `hotelAdmin`, default: `user` |
| `refreshToken` | String | Stored for token rotation |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

---

### Hotel

| Field | Type | Constraints |
|---|---|---|
| `title` | String | Required |
| `description` | String | Required |
| `location` | String | Required |
| `price` | Number | Required (per night, INR) |
| `images` | Array | `{ url: String, publicId: String }[]` |
| `amenities` | String[] | Optional |
| `owner` | ObjectId (ref: User) | Required |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

---

### Booking

| Field | Type | Constraints |
|---|---|---|
| `user` | ObjectId (ref: User) | Required |
| `hotel` | ObjectId (ref: Hotel) | Required |
| `checkIn` | Date | Required |
| `checkOut` | Date | Required |
| `guests` | Number | Required |
| `totalPrice` | Number | Required, auto-calculated |
| `status` | String (enum) | `pending` \| `confirmed` \| `cancelled`, default: `pending` |
| `paymentStatus` | String (enum) | `pending` \| `paid` \| `failed`, default: `pending` |
| `paymentIntentId` | String | Set by Stripe webhook |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

---

### Review

| Field | Type | Constraints |
|---|---|---|
| `rating` | Number | Required, 1-5 |
| `comment` | String | Required |
| `user` | ObjectId (ref: User) | Required |
| `hotel` | ObjectId (ref: Hotel) | Required |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

---

### ApprovalRequest

| Field | Type | Constraints |
|---|---|---|
| `payload` | Object | Required |
| `action` | String | Required |
| `requestedBy` | ObjectId (ref: User) | Required |
| `status` | String (enum) | `PENDING` \| `APPROVED` \| `REJECTED`, default: `PENDING` |
| `hotelId` | ObjectId (ref: Hotel) | Optional |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

---

### Ticket (Support)

| Field | Type | Constraints |
|---|---|---|
| `subject` | String | Required |
| `message` | String | Required |
| `user` | ObjectId (ref: User) | Required |
| `status` | String (enum) | `OPEN` \| `RESOLVED`, default: `OPEN` |
| `adminResponse` | String | Optional |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

---

### Log (System Log)

| Field | Type | Constraints |
|---|---|---|
| `action` | String | Required |
| `target` | String | Required |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

---

## 9. Role-Based Access Control

SpanStay implements three user roles:

| Role | Value | Capabilities |
|---|---|---|
| **User** | `user` | Browse hotels, create bookings, view own bookings, cancel own bookings, pay for bookings |
| **Hotel Admin** | `hotelAdmin` | All of User + register hotels, update own hotels, delete own hotels, confirm/cancel bookings for their properties |
| **Admin** | `admin` | All of Hotel Admin + register hotels, delete any hotel |

### RBAC Flow

```
Request → protect (verify JWT) → authorize(ROLES.X) → Controller
```

- `protect` — Verifies the Bearer token, attaches `req.user` with `{ id, email, role }`
- `authorize(...roles)` — Checks if `req.user.role` is in the allowed roles list

> Role assignment is done at registration time. To grant `hotelAdmin` or `admin` roles, the `role` field must be set directly (or via admin tools/seeders).

---

## 10. Backend Architecture Patterns

SpanStay follows a **modular, layered architecture**:

```
Routes → Controller → Service → Repository → Model
```

| Layer | Responsibility |
|---|---|
| **Routes** | Define HTTP method, path, middleware chain, and delegate to controller |
| **Controller** | Extract request data, call service, format and send HTTP response |
| **Service** | Business logic — validation, authorization checks, orchestration |
| **Repository** | Database queries only — no business logic |
| **Model** | Mongoose schema, virtuals, and pre-save hooks |

This separation ensures:
- Controllers stay thin and focused on HTTP concerns
- Business rules are testable in isolation (service layer)
- Database interactions are decoupled and swappable

### Error Handling

All errors are handled globally via `error.middleware.js`. Business logic throws `AppError` instances:

```js
throw new AppError('Hotel not found', 404);
```

The error middleware catches all errors, formats them consistently, and sends a JSON response.

### Validation

All incoming request bodies are validated using **Zod schemas** via the `validate` middleware before reaching the controller:

```js
router.post('/', validate(createBookingSchema), createBookingController);
```

---

## 11. Frontend Architecture

### State Management

Redux Toolkit is used for global state:
- `authSlice` — Stores `{ user, accessToken, isAuthenticated }`
- `authSelectors` — Memoized selectors for auth state

### Route Protection

```
/profile  →  ProtectedRoute  →  (isAuthenticated?)  →  UsersProfilePage
                                        ↓ No
                                   Redirect /signin
```

- `ProtectedRoute` — Redirects unauthenticated users to `/signin`
- `PublicRoute` — Redirects authenticated users away from auth pages

### Custom Hooks

| Hook | Purpose |
|---|---|
| `useAuth` | Returns current auth state from Redux |
| `useInitializeAuth` | Re-hydrates auth state from tokens on app load |

### Form Validation

Forms use **React Hook Form** integrated with **Zod resolvers** (`@hookform/resolvers/zod`) for client-side validation that mirrors backend schemas.

### Current Frontend Routes

| Path | Component | Access |
|---|---|---|
| `/` | Home Page | Public |
| `/signin` | `SigninPage` | Public |
| `/signup` | `SignupPage` | Public |
| `/hotels` | `HotelsPage` | Public |
| `/hotels/:id` | `HotelDetailPage` | Public |
| `/profile` | `UsersProfilePage` | Protected |
| `/my-bookings` | `MyBookingsPage` | Protected |
| `/dashboard` | `AdminDashboardPage` | Protected (Admin) |
| `/payment-success` | `PaymentSuccessPage` | Protected |
| `/payment-cancel` | `PaymentCancelPage` | Protected |

---

## 12. Security Implementation

| Mechanism | Implementation |
|---|---|
| **Password Hashing** | bcryptjs with 10 salt rounds (pre-save hook on User model) |
| **JWT Auth** | Short-lived access tokens (15 min) + long-lived refresh tokens (7 days) with rotation on each refresh |
| **HTTP Security Headers** | `helmet` sets Content-Security-Policy, X-Frame-Options, etc. |
| **HTTP Parameter Pollution** | `hpp` strips duplicate query/body params |
| **CORS** | Configured to allow only `CLIENT_URL` origin with credentials |
| **Rate Limiting** | `express-rate-limit` applied to all auth endpoints |
| **Request Validation** | Zod schemas validate all request bodies before controller execution |
| **Stripe Webhook Verification** | Raw body + `stripe.webhooks.constructEvent()` with HMAC signature |
| **Role Authorization** | Middleware-level role checks on every protected resource |

---

## 13. Caching Strategy

Redis is used for **hotel listing cache** to reduce database load.

### How it works

1. On `GET /hotels`, a cache key is generated from the full query string: `hotels:{JSON.stringify(query)}`
2. If a cached result exists → return immediately (cache hit)
3. If not → query MongoDB, store result in Redis with **60-second TTL**, return result
4. On any **create**, **update**, or **delete** hotel operation → `clearHotelCache()` is called to invalidate all `hotels:*` keys

### Cache Invalidation

`clearHotelCache()` uses Redis `SCAN` to find and delete all keys matching the `hotels:*` pattern, ensuring stale data is never served after mutations.

---

## 14. Payment Flow

```
User creates booking (status: pending, paymentStatus: pending)
         │
         ▼
POST /payments/checkout/:bookingId
         │
         ▼
Stripe Checkout Session created
         │
         ▼
User redirected to Stripe hosted payment page
         │
    ┌────┴────┐
    │         │
  Success   Cancel
    │         │
    ▼         ▼
Stripe sends  User redirected
webhook       to PAYMENT_CANCEL_URL
    │
    ▼
POST /payments/webhook (checkout.session.completed)
    │
    ▼
Booking updated:
  status → "confirmed"
  paymentStatus → "paid"
  paymentIntentId → stored
```

> **Important:** The Stripe webhook endpoint must be configured in the Stripe Dashboard to point to your publicly accessible server URL (use ngrok for local development).

---

## 15. Docker Setup

The `docker-compose.yml` in `backend/` orchestrates three services:

```yaml
services:
  backend:    # Express API on port 4000
  mongodb:    # MongoDB 7 on port 27017 (persistent volume)
  redis:      # Redis 7 Alpine on port 6379
```

### Dockerfile (Backend)

Multi-stage or single-stage Node.js image running `node src/server.js` on port 4000.

### Useful Docker Commands

```bash
# Start all services
docker-compose up -d

# Start only infrastructure (run backend locally)
docker-compose up -d mongodb redis

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs -f backend

# Stop all
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

## 16. Middleware Reference

| Middleware | File | Purpose |
|---|---|---|
| `protect` | `auth.middleware.js` | Verifies JWT Bearer token, attaches `req.user` |
| `authorize` | `authorize.middleware.js` | Checks `req.user.role` against allowed roles |
| `validate` | `validate.middleware.js` | Validates `req.body` against a Zod schema |
| `upload` | `fileUpload.middleware.js` | Handles multipart file uploads via Multer → Cloudinary |
| `authLimiter` | `rateLimit.middleware.js` | Rate limiting for auth endpoints |
| `errorHandler` | `error.middleware.js` | Global error handler — formats all errors as JSON |
| `morgan('dev')` | (inline in app.js) | HTTP request logging |
| `helmet()` | (inline in app.js) | Security headers |
| `hpp()` | (inline in app.js) | HTTP Parameter Pollution protection |
| `cors()` | (inline in app.js) | Cross-Origin Resource Sharing configuration |
| `systemLogger` | `systemLog.middleware.js`| Automatically intercepts and logs all mutating API calls (POST, PATCH, DELETE) to the database. |

---

## 17. Admin and Approval Workflow

SpanStay implements a robust moderation system for hotel management to ensure data quality.

### The Approval Lifecycle
1. **Initiation**: When a `hotelAdmin` attempts to Create, Update, Delete, or toggle the status of a hotel, the action is intercepted.
2. **Pending State**: Instead of mutating the live database immediately (except for Creates, which are stored in a `PENDING` state), an `ApprovalRequest` document is created storing the `payload`, `action` type, and `requestedBy` user ID.
3. **Admin Review**: Super Admins (`admin` role) have access to a dashboard to view all `PENDING` requests, alongside nicely formatted payload details (including image previews and amenity lists).
4. **Resolution**: 
   - If **Approved**, the requested mutation is applied to the `Hotel` model, and the request status becomes `APPROVED`.
   - If **Rejected**, the request is marked `REJECTED`, and the hotel remains unchanged (or is deleted if it was a rejected creation).

### Rate Limiting & Protections
- Hotel Admins cannot submit multiple conflicting requests for the same hotel. If a request is already `PENDING`, subsequent mutations are blocked with a `429` error.
- Offline/Disabled hotels are completely hidden from public browsing but can still be discovered if explicitly searched for, rendering in a visually disabled state to prevent booking.

---

## 18. User Support System

A built-in support ticketing system is provided to bridge communication between users and platform administrators.

- **Ticket Creation**: Users can create support tickets detailing their issues.
- **Admin Dashboard**: Super Admins view a consolidated list of all support tickets.
- **Resolution**: Admins can respond to tickets and mark them as `RESOLVED`.
- **Visibility**: Users can track the status of their own tickets and read admin responses directly from their profile dashboard.

---

## 19. UI Skeleton Loading System

SpanStay uses a modern, skeleton-based loading system to ensure smooth transitions and reduce perceived loading times.

- **Unified Primitive (`Skeleton.jsx`)**: A core pulse-animated block styled perfectly for the application's dark mode (`bg-white/10 animate-pulse`).
- **Page-Specific Skeletons**: Tailored components such as `ProfileSkeleton`, `HotelDetailSkeleton`, and `ReviewSkeleton` precisely mirror the layout of arriving data.
- **Generic Skeletons**: Flexible `CardSkeleton` and `TableSkeleton` are used universally across admin dashboards (Manage Users, Manage Approvals, etc.) and lists (Bookings, Tickets).
- **Spinner Replacement**: All full-page and component-level legacy spinners (e.g., `Loader2` from Lucide) have been entirely removed in favor of these layout-accurate skeleton blocks.

---

*Documentation generated for SpanStay v1.0.0 — Last updated: June 2026*
