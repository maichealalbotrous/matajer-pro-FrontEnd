import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Plus } from 'lucide-react';
import ProductFormModal from '../ProductFormModal/ProductFormModal';
import { getProductsFromServer } from './lib';

const ProductsManager = () => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Model state for the ProductFormModal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteIntent, setIsDeleteIntent] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProductsFromServer();
      setProductsList(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || "فشل تحميل المنتجات من السيرفر.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add New Products
  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  // Edit Products
const handleOpenEdit = (product) => {
  setSelectedProduct(product);
  setIsDeleteIntent(false);
  setIsModalOpen(true);
};

// Delete Products
const handleOpenDelete = (product) => {
  setSelectedProduct(product);
  setIsDeleteIntent(true);
  setIsModalOpen(true);
};

  return (
    <div className="p-8 space-y-8 bg-[#fcfcfc] min-h-screen relative">
      <div className="flex justify-between items-center mb-10">
        {/* Add Products Button*/}
        <button 
          onClick={handleAddNew}
          className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-5 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus size={16} />
          إضافة منتج جديد
        </button>
        <h1 className="text-4xl font-black text-[#0f172a]">المعرض الرئيسي</h1>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-[#0f172a] rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold text-sm">جاري تحميل المنتجات...</p>
        </div>
      ) : error ? (
        <div className="p-6 text-center bg-red-50 text-red-600 rounded-[25px] border border-red-100 font-bold">
          {error}
        </div>
      ) : (
        <ProductCard 
          productsData={productsList} 
          onEditProduct={handleOpenEdit} 
          onDeleteProduct={handleOpenDelete} 
        />      )}

      {/* ProductFormModal*/}
     <ProductFormModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      productToEdit={selectedProduct}
      initialDeleteState={isDeleteIntent}
      onRefresh={fetchProducts} 
    />
    </div>
  );
};

export default ProductsManager;