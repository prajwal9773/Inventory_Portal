# Inventory Management System

A modern, responsive React application for managing and exploring product inventory with advanced features like search, filtering, pagination, and lazy loading.

## Features

### Core Functionality
- ✅ **Inventory Overview**: Comprehensive product list with filtering, sorting, and search
- ✅ **Product Details**: Detailed product view with related products
- ✅ **Catalogue Overview**: Hierarchical category-based navigation
- ✅ **Welcome Home Page**: User-friendly landing page with navigation

### Technical Features
- ✅ **Pagination**: Efficient data pagination (20 items per page minimum)
- ✅ **Debouncing**: Optimized search with 500ms debounce delay
- ✅ **Case-Insensitive Search**: Search works regardless of case
- ✅ **Lazy Loading**: Images and data loaded on demand
- ✅ **Shimmer Effects**: Beautiful loading skeletons while fetching data
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ✅ **Error Handling**: Clear error messages with retry functionality
- ✅ **State Management**: Context API for global state management

## Tech Stack

- **Frontend Framework**: React 18
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorMessage.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   ├── Pagination.jsx
│   ├── ProductCard.jsx
│   └── Shimmer.jsx
├── context/            # Context API for state management
│   └── AppContext.jsx
├── hooks/              # Custom React hooks
│   └── useDebounce.js
├── pages/              # Page components
│   ├── CatalogueOverview.jsx
│   ├── Home.jsx
│   ├── InventoryOverview.jsx
│   └── ProductDetails.jsx
├── services/           # API service layer
│   └── api.js
├── App.jsx             # Main app component with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## API Configuration

The application uses the Fake Store API by default. To change the API endpoint, update the `API_BASE_URL` in `src/services/api.js`.

## Features in Detail

### Inventory Overview
- View all products in a table format
- Filter by category
- Sort by name or price (ascending/descending)
- Search products by name or description (case-insensitive)
- Pagination with 20 items per page
- Real-time search with debouncing

### Product Details
- Full product information display
- Product image with lazy loading
- Rating and review count
- Stock status indicator
- Related products from the same category
- Breadcrumb navigation

### Catalogue Overview
- Visual category cards with product images
- Click to drill down into category products
- Seamless navigation to inventory view

### Home Page
- Welcome screen with feature overview
- Quick navigation to main sections
- Feature highlights

## Performance Optimizations

- **Debounced Search**: Reduces API calls during typing
- **Lazy Loading**: Images load only when needed
- **Pagination**: Limits data loaded at once
- **Memoization**: Context API with useCallback for optimized re-renders
- **Shimmer Effects**: Better perceived performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for assignment purposes.

