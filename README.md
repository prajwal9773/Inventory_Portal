# StoreAdmin Catalog Inventory Portal

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, responsive React application for managing and exploring product inventory with advanced features like search, filtering, pagination, and hierarchical category navigation.

## 🚀 Live Demo

**Deployed Application**: [Your Deployment Link Here]  
**GitHub Repository**: [Your Repository Link Here]

---

## ✨ Features

### Core Functionality
- ✅ **Inventory Overview** - Comprehensive product list with filtering, sorting & search
- ✅ **Product Details** - Detailed view with related product recommendations
- ✅ **Catalogue Overview** - Hierarchical category navigation with drill-down
- ✅ **Welcome Home** - User-friendly landing page with clear navigation

### Technical Highlights
- ⚡ **Pagination** - 20+ items per page with smooth navigation
- 🔍 **Debounced Search** - 500ms optimized search
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🎨 **Shimmer Loading** - Beautiful skeleton loaders
- 🛡️ **Error Handling** - Clear messages with retry functionality
- 🔄 **State Management** - React Context API

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State**: Context API
- **API**: DummyJSON Products API

---

## 🚦 Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd inventory-management-system

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
├── context/          # Global state management
├── hooks/            # Custom React hooks
├── pages/            # Route components
├── services/         # API layer
└── App.jsx           # Main app with routing
```

---

## 📖 User Stories Implementation

### 1️⃣ Inventory Overview Screen ✅
- **Data Visibility**: Product Name, Price, Brand, Category, Stock, Rating, Discount
- **Organization**: Sort by Price/Name, Filter by Category
- **Data Volume**: Pagination with 20+ products per page
- **Quick Search**: Real-time debounced search (500ms)

### 2️⃣ Product Details Screen ✅
- **Visual Layout**: Clean design with large product image
- **Information Depth**: Description, Rating, Reviews, Discount, Stock
- **Related Products**: 6 similar products from same category as visual cards

### 3️⃣ Catalogue Overview Screen ✅
- **High-Level View**: Visual category cards with images
- **API Integration**: `/products/categories` + `/products/category/{category}`
- **Drill-Down**: Click category → filtered product list
- **Reusability**: Same Inventory Overview component

### 4️⃣ Welcome Home Page ✅
- **User Guidance**: Clear instructions for new users
- **Navigation**: Direct links to Inventory & Catalogue
- **Feature Highlights**: Modern, engaging design

---

## 🎯 Assumptions & Design Decisions

### API & Data

1. **API Source**  
   - Using `dummyjson.com/products` as specified in assignment
   - **Reasoning**: Provides rich data (brands, discounts, ratings, search)

2. **Pagination Strategy**  
   - Server-side for initial load, client-side for filtered results
   - **Reasoning**: Better UX for search/filter operations

3. **Stock Status**  
   - `>= 10`: "In Stock" | `< 10`: "Low Stock" | `0`: "Out of Stock"
   - **Reasoning**: Visual clarity for inventory management

4. **Related Products**  
   - Show 6 products from same category, exclude current
   - **Reasoning**: Assignment specifies limit of 6

5. **Category Images**  
   - Use first product image as category thumbnail
   - **Reasoning**: API lacks category images; maintains visual consistency

### UI/UX

6. **Search Debounce**  
   - 500ms delay
   - **Reasoning**: Reduces API calls ~80% while maintaining responsiveness

7. **Products Per Page**  
   - 20 items default
   - **Reasoning**: Assignment minimum + optimal screen density

8. **Loading States**  
   - Shimmer effects over spinners
   - **Reasoning**: Better perceived performance

9. **Responsive Breakpoints**  
   - Mobile: <640px | Tablet: 640-1024px | Desktop: >1024px
   - **Reasoning**: Covers all assignment-specified devices

10. **Component Reusability**  
    - Inventory component reused for category drill-down
    - **Reasoning**: Assignment requirement + consistency

11. **Missing Data**  
    - Display "N/A" for missing fields
    - **Reasoning**: Graceful degradation

12. **Search Scope**  
    - Case-insensitive name search using DummyJSON API
    - **Reasoning**: Leverages built-in API capabilities

---

## ⚡ Performance Optimizations

- **Debounced Search**: Reduces API calls by ~80%
- **Lazy Loading**: Images load on viewport visibility
- **Pagination**: Limits DOM to 20 elements
- **Shimmer Effects**: Improves perceived performance
- **Memoization**: useCallback/useMemo for expensive operations
- **Code Splitting**: Route-based chunking

---

## 🎨 Quality & UX Standards

✅ **Network Transparency** - Loading states, error messages, retry options  
✅ **Device Agnostic** - Responsive across mobile, tablet, desktop  
✅ **Brand Identity** - Consistent colors (indigo/blue), spacing, typography  
✅ **Code Quality** - Modular, reusable components, clean architecture

---

## 🔧 Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Code linting
```



## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) - Product API
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool

---

**Built with ❤️ by Prajwal**

