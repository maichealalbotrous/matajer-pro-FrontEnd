import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from './lib';
import ProductCard from '../ProductCard/ProductCard';


const ProductsManager = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-[#0f172a]">المعرض الرئيسي</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.product_id} 
            product={product} 
            onClick={() => navigate(`/products/${product.product_id}/variants`)} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsManager;