import { createSlice } from '@reduxjs/toolkit'

const initialProducts = [
  {
    id: 1,
    title: 'Wireless Noise-Canceling Headphones',
    price: 199.99,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'Immersive sound with active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions.',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Minimalist Smart Watch',
    price: 149.50,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: 'Track daily fitness, heart rate, sleep metrics, and receive instant smartphone notifications on a crisp OLED display.',
    rating: 4.6,
  },
  {
    id: 3,
    title: 'Mechanical Gaming Keyboard',
    price: 89.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    description: 'Tactile mechanical switches with per-key RGB backlighting and durable aircraft-grade aluminum alloy frame.',
    rating: 4.7,
  },
  {
    id: 4,
    title: 'Ergonomic Wireless Mouse',
    price: 49.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80',
    description: 'Sculpted ergonomic design that reduces wrist fatigue, dual Bluetooth/2.4GHz connectivity, and whisper-quiet clicks.',
    rating: 4.5,
  },
  {
    id: 5,
    title: 'Portable Bluetooth Speaker',
    price: 69.99,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80',
    description: 'Waterproof IPX7 outdoor speaker featuring 360-degree bass-rich audio and up to 15 hours of continuous playtime.',
    rating: 4.4,
  },
  {
    id: 6,
    title: 'Classic Leather Laptop Sleeve',
    price: 39.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    description: 'Handcrafted vegan leather sleeve with soft microfiber interior lining to protect laptops up to 15.6 inches.',
    rating: 4.9,
  },
  {
    id: 7,
    title: 'Fast Wireless Charging Pad',
    price: 29.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=600&auto=format&fit=crop&q=80',
    description: '15W Qi-certified fast wireless charging pad with temperature control and LED power indicator.',
    rating: 4.3,
  },
  {
    id: 8,
    title: '4K Ultra HD Action Camera',
    price: 249.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
    description: 'Capture adventure sports in 4K at 60fps with electronic image stabilization and waterproof casing up to 30 meters.',
    rating: 4.7,
  },
]

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: initialProducts,
    selectedCategory: 'All',
    searchTerm: '',
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
  },
})

export const { setCategory, setSearchTerm } = productsSlice.actions
export default productsSlice.reducer
