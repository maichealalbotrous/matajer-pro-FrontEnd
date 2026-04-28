import React from 'react';
import { products } from './lib';
import ProductCard from '../ProductCard/ProductCard';


const ProductsManager = () => {

  return (
     <div className="p-8 space-y-8 bg-[#fcfcfc] min-h-screen">
      <div className="text-right mb-10">
        <h1 className="text-4xl font-black text-[#0f172a]">المعرض الرئيسي</h1>
      </div>

      <ProductCard productsData={products} />
    </div>
  );
};

export default ProductsManager;