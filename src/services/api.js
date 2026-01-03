
const API_BASE_URL = 'https://dummyjson.com';


export const getAllProducts = async (limit = 0, skip = 0, sortBy = null, order = 'asc') => {
  try {
    let url = `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`;
    if (sortBy) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();

    return data.products || data; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};


export const getAllCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
 
    const result = Array.isArray(data) ? data : [];
    return result;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category, limit = 6) => {
  try {
    const url = limit > 0 
      ? `${API_BASE_URL}/products/category/${category}?limit=${limit}`
      : `${API_BASE_URL}/products/category/${category}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    const data = await response.json();

    return data.products || data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search products');
    const data = await response.json();
    return data.products || data; 
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

