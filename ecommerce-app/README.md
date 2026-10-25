# QuickStore — Simple React E-Commerce Store with Redux Toolkit

A clean, beginner-friendly E-Commerce application built with **React**, **Redux Toolkit**, and **React Router v6**. Designed for Front End Engineering coursework, assignments, and vivas.

---

## 🚀 Features

- **Multi-Page SPA Routing** (`react-router-dom` v6):
  - `/`: Product catalog with live search & category filtering.
  - `/product/:id`: Dynamic product details page with rating, specs, and add-to-cart.
  - `/cart`: Shopping cart with item quantity increment/decrement, remove, and subtotal calculation.
  - `/checkout`: Clean shipping & payment form with live input validation and order confirmation screen.
- **Global State Management with Redux Toolkit**:
  - `cartSlice.js`: Manages cart items, quantities, add/remove actions, and subtotal selectors.
  - `productsSlice.js`: Manages product list, active category filter, and search keywords.
  - `store.js`: Central Redux store configured via `configureStore()`.
- **Responsive & Modern Design**:
  - Pure, clean CSS styling without external CSS framework overhead.
  - Interactive UI with live cart badge counter on the Navbar.

---

## 📁 Project Structure

```text
ecommerce-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky header with active NavLink & cart counter badge
│   │   └── ProductCard.jsx     # Card component with image, price, rating & add to cart
│   ├── pages/
│   │   ├── HomePage.jsx        # Product catalog with search and category filters
│   │   ├── ProductDetailPage.jsx # Product detail view using useParams()
│   │   ├── CartPage.jsx        # Shopping cart table, quantity modifier & order summary
│   │   └── CheckoutPage.jsx    # Shipping & payment form with validation & order confirmation
│   ├── redux/
│   │   ├── store.js            # Central Redux store
│   │   ├── cartSlice.js        # Cart state, actions (add, remove, quantity) & selectors
│   │   └── productsSlice.js    # Products list, category filter, and search state
│   ├── App.jsx                 # Main layout and route definitions
│   ├── main.jsx                # React root wrapped in Redux <Provider> & <BrowserRouter>
│   └── index.css               # Clean, responsive styles
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Tech Stack

- **React 19**
- **Redux Toolkit (`@reduxjs/toolkit` & `react-redux`)**
- **React Router DOM v6**
- **Vite**

---

## 🏃 Getting Started

1. Navigate to the project directory:
   ```bash
   cd C:\Users\my\Desktop\feeassignments\ecommerce-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at the URL shown in the terminal (usually `http://localhost:5173`).
