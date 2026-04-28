import React from 'react';
import ProductEmployeeCard from '../ProductEmployeeCard/ProductEmployeeCard';

const ProductsManager = () => {
  const products = [
    { product_id: 1, product_name: 'iPhone 15 Pro', image: null, variants_groups: [1, 2] },
    { product_id: 2, product_name: 'Samsung S24', image: null, variants_groups: [1] },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#fcfcfc] min-h-screen">
      <div className="text-right mb-10">
        <h1 className="text-4xl font-black text-[#0f172a]">المعرض الرئيسي</h1>
        <p className="text-slate-400 font-bold mt-2">اختر الصنف لمتابعة عملية البيع</p>
      </div>

      <ProductEmployeeCard productsData={products} />
    </div>
  );
};

export default ProductsManager;