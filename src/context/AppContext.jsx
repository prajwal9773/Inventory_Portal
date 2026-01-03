import React, { createContext, useContext, useReducer, useCallback } from 'react';
import * as api from '../services/api';

const AppContext = createContext();

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 20,
  searchQuery: '',
  selectedCategory: '',
  sortBy: 'name', // 'name' or 'price'
  sortOrder: 'asc', // 'asc' or 'desc'
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PRODUCTS':
      return { 
        ...state, 
        products: action.payload, 
        loading: false, 
        error: null 
      };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload, currentPage: 1 };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload, currentPage: 1 };
    case 'SET_SORT':
      return { 
        ...state, 
        sortBy: action.payload.sortBy, 
        sortOrder: action.payload.sortOrder 
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        searchQuery: '',
        selectedCategory: '',
        sortBy: 'name',
        sortOrder: 'asc',
        currentPage: 1,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchProducts = useCallback(async (page = 1, category = null) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:64',message:'fetchProducts called',data:{page,category},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A,B'})}).catch(()=>{});
    // #endregion
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      let products;
      if (category) {
        // Fetch all products in category for filtering/sorting
        products = await api.getProductsByCategory(category, 100);
      } else {
        // Fetch all products (API doesn't support offset, so we fetch all and paginate client-side)
        products = await api.getAllProducts();
        // Clear search query when fetching all products (no category filter)
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:77',message:'fetchProducts: clearing searchQuery when fetching all products',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
      }
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:82',message:'fetchProducts: got products, setting products',data:{productsCount:products.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      dispatch({ type: 'SET_PRODUCTS', payload: products });
      dispatch({ type: 'SET_PAGE', payload: page });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const categories = await api.getAllCategories();
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:84',message:'fetchCategories received',data:{categoriesType:typeof categories,isArray:Array.isArray(categories),length:categories?.length,firstItem:categories?.[0],firstItemType:categories?.[0]?typeof categories[0]:null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,D'})}).catch(()=>{});
      // #endregion
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const searchProducts = useCallback(async (query) => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:94',message:'searchProducts called',data:{query,queryLength:query?.length,queryTrimmed:query?.trim(),isEmpty:!query?.trim()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    if (!query.trim()) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:96',message:'searchProducts: empty query, calling fetchProducts',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      await fetchProducts(1);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:98',message:'searchProducts: after fetchProducts, checking if searchQuery was reset',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      return;
    }
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const products = await api.searchProducts(query);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:103',message:'searchProducts: got results, setting products and searchQuery',data:{productsCount:products.length,query},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      dispatch({ type: 'SET_PRODUCTS', payload: products });
      dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [fetchProducts]);

  const setCategory = useCallback((category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  }, []);

  const setSort = useCallback((sortBy, sortOrder) => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  }, []);

  const resetFilters = useCallback(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:121',message:'resetFilters called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  // Sort and filter products
  const getFilteredAndSortedProducts = useCallback(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:126',message:'getFilteredAndSortedProducts entry',data:{productsCount:state.products.length,searchQuery:state.searchQuery,searchQueryLength:state.searchQuery?.length,selectedCategory:state.selectedCategory},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    let filtered = [...state.products];

    // Apply category filter
    if (state.selectedCategory) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:159',message:'applying category filter',data:{selectedCategory:state.selectedCategory,productsCount:filtered.length,firstProductCategory:filtered[0]?.category},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      // Products have category as string (e.g., "beauty"), compare with selectedCategory (slug)
      filtered = filtered.filter(p => p.category === state.selectedCategory);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:163',message:'after category filter',data:{filteredCount:filtered.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
    }

    // Apply search filter (case-insensitive) - only by product name
    if (state.searchQuery) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:137',message:'applying search filter',data:{searchQuery:state.searchQuery,beforeFilterCount:filtered.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query)
      );
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:143',message:'after search filter',data:{afterFilterCount:filtered.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      if (state.sortBy === 'name') {
        aVal = a.title.toLowerCase();
        bVal = b.title.toLowerCase();
      } else {
        aVal = a.price;
        bVal = b.price;
      }

      if (state.sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'AppContext.jsx:161',message:'getFilteredAndSortedProducts return',data:{filteredCount:filtered.length,searchQuery:state.searchQuery},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return filtered;
  }, [state.products, state.selectedCategory, state.searchQuery, state.sortBy, state.sortOrder]);

  const value = {
    ...state,
    fetchProducts,
    fetchCategories,
    searchProducts,
    setCategory,
    setSort,
    setPage,
    resetFilters,
    getFilteredAndSortedProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

