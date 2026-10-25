import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart (or increment quantity if already exists)
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },

    // Remove item completely from cart
    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
    },

    // Increase item quantity
    increaseQuantity: (state, action) => {
      const id = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity += 1
      }
    },

    // Decrease item quantity (remove if reaches 0)
    decreaseQuantity: (state, action) => {
      const id = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter((i) => i.id !== id)
        }
      }
    },

    // Clear entire cart (used after checkout)
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

// Selectors
export const selectCartItems = (state) => state.cart.items

export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartTotalPrice = (state) =>
  state.cart.items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2)
