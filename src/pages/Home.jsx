// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllProducts, getAllCategories } from '../services/api';
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';

// const Home = () => {
//   const [inventoryData, setInventoryData] = useState({
//     totalSKUs: 0,
//     lowStockItems: 0,
//     overstockedItems: 0,
//     totalCategories: 0,
//     loading: true,
//     error: null,
//   });

//   useEffect(() => {
//     const fetchInventorySnapshot = async () => {
//       try {
//         setInventoryData((prev) => ({ ...prev, loading: true, error: null }));
//         const [products, categories] = await Promise.all([
//           getAllProducts(0, 0),
//           getAllCategories(),
//         ]);

//         const lowStockCount = products.filter(
//           (p) => (p.stock || 0) <= 10 && (p.stock || 0) > 0
//         ).length;
//         const overstockedCount = products.filter((p) => (p.stock || 0) > 100).length;

//         setInventoryData({
//           totalSKUs: products.length,
//           lowStockItems: lowStockCount,
//           overstockedItems: overstockedCount,
//           totalCategories: categories.length,
//           loading: false,
//           error: null,
//         });
//       } catch (err) {
//         setInventoryData((prev) => ({
//           ...prev,
//           loading: false,
//           error: err.message,
//         }));
//       }
//     };

//     fetchInventorySnapshot();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-gray-50">
//       {/* Hero Section - Operational Dashboard Header */}
//       <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
//         <div className="container mx-auto px-4 py-12">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex items-center justify-between flex-wrap gap-4">
//               <div>
//                 <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
//                   Store Admin Dashboard
//                 </h1>
//                 <p className="text-lg md:text-xl text-primary-100">
//                   Inventory management portal for daily store operations
//                 </p>
//               </div>
//               <div className="flex flex-wrap gap-3">
//                 <Link
//                   to="/inventory"
//                   className="px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                   </svg>
//                   View Inventory
//                 </Link>
//                 <Link
//                   to="/analysis"
//                   className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-400 transition-all font-semibold border-2 border-white/30 hover:border-white/50 flex items-center gap-2"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                   Stock Alerts
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Quick Inventory Snapshot */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-2xl font-bold text-gray-900">Inventory Snapshot</h2>
//             <span className="text-sm text-gray-500">System health overview</span>
//           </div>
//           {inventoryData.loading ? (
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <LoadingSpinner />
//             </div>
//           ) : inventoryData.error ? (
//             <div className="bg-white rounded-xl shadow-lg p-8">
//               <ErrorMessage message={inventoryData.error} />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600 mb-1">Total SKUs</p>
//                     <p className="text-3xl font-bold text-gray-900">{inventoryData.totalSKUs}</p>
//                   </div>
//                   <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//               <Link
//                 to="/analysis"
//                 className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all cursor-pointer"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600 mb-1">Low Stock Items</p>
//                     <p className="text-3xl font-bold text-yellow-600">{inventoryData.lowStockItems}</p>
//                     <p className="text-xs text-gray-500 mt-1">Needs attention</p>
//                   </div>
//                   <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                     <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                     </svg>
//                   </div>
//                 </div>
//               </Link>
//               <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600 mb-1">Overstocked Items</p>
//                     <p className="text-3xl font-bold text-orange-600">{inventoryData.overstockedItems}</p>
//                     <p className="text-xs text-gray-500 mt-1">Stock > 100 units</p>
//                   </div>
//                   <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
//                     <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600 mb-1">Total Categories</p>
//                     <p className="text-3xl font-bold text-gray-900">{inventoryData.totalCategories}</p>
//                   </div>
//                   <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                     <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Main Feature Cards - Task-Oriented */}
//         <div className="grid md:grid-cols-3 gap-8 mb-12">
//           <Link
//             to="/inventory"
//             className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
//           >
//             <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
//               <svg
//                 className="w-10 h-10 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-primary-600 transition-colors">
//               Inventory Overview
//             </h2>
//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Search products by SKU or name, filter by category, and monitor stock levels in real-time. 
//               Sort and paginate through your inventory to quickly locate items and assess stock status.
//             </p>
//             <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
//               Manage Inventory
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>

//           <Link
//             to="/catalogue"
//             className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
//           >
//             <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
//               <svg
//                 className="w-10 h-10 text-green-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-primary-600 transition-colors">
//               Browse by Category
//             </h2>
//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Navigate products organized by category for quick access. Filter inventory by specific 
//               product groups to streamline daily operations and category-based stock management.
//             </p>
//             <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
//               View Categories
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>

//           <Link
//             to="/analysis"
//             className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
//           >
//             <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
//               <svg
//                 className="w-10 h-10 text-purple-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-primary-600 transition-colors">
//               Inventory Analysis
//             </h2>
//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Identify inventory risks with visual analytics. Monitor low stock alerts, track category 
//               distributions, and spot products requiring immediate attention to prevent stockouts.
//             </p>
//             <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
//               View Analytics
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>
//         </div>

//         {/* Admin Tools Grid */}
//         <div className="bg-white rounded-2xl shadow-xl p-10 mb-12 border border-gray-100">
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Admin Tools & Capabilities
//             </h2>
//             <p className="text-gray-600">
//               Essential features for daily inventory management operations
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="flex flex-col">
//               <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//                 <svg
//                   className="w-8 h-8 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="font-bold text-gray-800 mb-2 text-lg">
//                 Search by SKU
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 Quickly locate products using SKU or product name search with instant results
//               </p>
//             </div>
//             <div className="flex flex-col">
//               <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
//                 <svg
//                   className="w-8 h-8 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                   />
//                 </svg>
//               </div>
//               <h3 className="font-bold text-gray-800 mb-2 text-lg">
//                 Filter by Category
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 Organize and filter inventory by product categories for efficient navigation
//               </p>
//             </div>
//             <div className="flex flex-col">
//               <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
//                 <svg
//                   className="w-8 h-8 text-yellow-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="font-bold text-gray-800 mb-2 text-lg">
//                 Monitor Stock Levels
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 Track inventory levels in real-time and receive alerts for low stock items
//               </p>
//             </div>
//             <div className="flex flex-col">
//               <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4">
//                 <svg
//                   className="w-8 h-8 text-red-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="font-bold text-gray-800 mb-2 text-lg">
//                 Identify Risks
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 Spot inventory risks and stockouts early with visual analytics and alerts
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, getAllCategories } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const [inventoryData, setInventoryData] = useState({
    totalSKUs: 0,
    lowStockItems: 0,
    overstockedItems: 0,
    totalCategories: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchInventorySnapshot = async () => {
      try {
        setInventoryData((prev) => ({ ...prev, loading: true, error: null }));

        const [products, categories] = await Promise.all([
          getAllProducts(0, 0),
          getAllCategories(),
        ]);

        const lowStockCount = products.filter(
          (p) => (p.stock || 0) <= 10 && (p.stock || 0) > 0
        ).length;

        const overstockedCount = products.filter(
          (p) => (p.stock || 0) > 100
        ).length;

        setInventoryData({
          totalSKUs: products.length,
          lowStockItems: lowStockCount,
          overstockedItems: overstockedCount,
          totalCategories: categories.length,
          loading: false,
          error: null,
        });
      } catch (err) {
        setInventoryData((prev) => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    };

    fetchInventorySnapshot();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Enterprise Inventory Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-center text-slate-900 leading-tight mb-6">
           Inventory
            <br />
            <span className="text-indigo-600">Management System</span>
          </h1>

          <p className="text-lg md:text-xl text-center text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Keep track of products, monitor stock levels, and organize your catalog efficiently. Simple tools that help you stay on top of inventory without the hassle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              to="/inventory"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 text-white rounded-lg font-semibold shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-200"
            >
              Open Dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/analysis"
              className="px-7 py-3.5 bg-white text-slate-700 rounded-lg font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 shadow-sm"
            >
              View Analytics
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Easy to Use</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Always Updated</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Well Organized</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SNAPSHOT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">
            Overview
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Real-Time Inventory Status
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Monitor key metrics and maintain optimal stock levels across your entire catalog
          </p>
        </div>

        {inventoryData.loading ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12">
            <LoadingSpinner />
          </div>
        ) : inventoryData.error ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12">
            <ErrorMessage message={inventoryData.error} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              label="Total SKUs"
              value={inventoryData.totalSKUs}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
              color="blue"
            />
            <MetricCard
              label="Low Stock Items"
              value={inventoryData.lowStockItems}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
              color="amber"
              highlight="warning"
              link="/analysis"
            />
            <MetricCard
              label="Overstocked Items"
              value={inventoryData.overstockedItems}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
              color="slate"
            />
            <MetricCard
              label="Active Categories"
              value={inventoryData.totalCategories}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              }
              color="emerald"
            />
          </div>
        )}
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">
              Platform Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Inventory Control
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Professional tools designed to optimize your inventory operations and drive business growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Inventory Management"
              description="Search and manage your products quickly. Filter by category, check stock levels, and update quantities whenever needed—all in one place."
              link="/inventory"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              }
            />

            <FeatureCard
              title="Category Organization"
              description="Keep your catalog organized with categories. Browse products by type, quickly navigate between sections, and maintain a clean structure."
              link="/catalogue"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              }
            />

            <FeatureCard
              title="Stock Analysis"
              description="Get a clear view of which items need attention. See low stock alerts, identify overstocked items, and make better ordering decisions."
              link="/analysis"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ================= VALUE PROPOSITION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">
              Why It Matters
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Designed for Daily Operations
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Streamline your workflow with tools that reduce manual work, minimize errors, and give you instant visibility into stock levels whenever you need them.
            </p>
            
            <div className="space-y-4">
              <ValuePoint
                title="Quick Search & Filters"
                description="Find any product in seconds with powerful search and category filters"
              />
              <ValuePoint
                title="Stock Level Monitoring"
                description="Instant alerts when items run low so you never miss a reorder"
              />
              <ValuePoint
                title="Detailed Analysis"
                description="Get a clear view of which items need attention. See low stock alerts, identify overstocked items, and make better ordering decisions."
              />
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-indigo-50 to-slate-100 rounded-2xl border border-slate-200 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-2xl mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-4xl font-bold text-slate-900 mb-2">Fast</p>
                <p className="text-slate-600">Access Anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-slate-900 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Managing Smarter Today
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Everything you need to track inventory, monitor stock levels, and stay organized in one simple dashboard.
          </p>
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition-colors duration-200 shadow-lg"
          >
            Open Dashboard
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const MetricCard = ({ label, value, icon, color, highlight, link }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-50 text-slate-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  const content = (
    <div className={`group relative bg-white rounded-xl p-6 border transition-all duration-200 ${
      highlight === 'warning' 
        ? 'border-amber-200 hover:border-amber-300 hover:shadow-md' 
        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colorMap[color]}`}>
          {icon}
        </div>
        {highlight && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-medium">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Alert
          </span>
        )}
      </div>
      
      <p className="text-sm font-medium text-slate-600 mb-1">
        {label}
      </p>
      
      <p className="text-3xl font-bold text-slate-900">
        {value.toLocaleString()}
      </p>
    </div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
};

const FeatureCard = ({ title, description, link, icon }) => {
  return (
    <Link
      to={link}
      className="group bg-white rounded-xl p-8 border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-200"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg mb-6 group-hover:bg-indigo-100 transition-colors">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      
      <p className="text-slate-600 leading-relaxed mb-4">
        {description}
      </p>
      
      <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm group-hover:gap-3 transition-all">
        <span>Learn more</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
};

const ValuePoint = ({ title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Home;