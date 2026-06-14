import React, { useEffect, useState } from 'react';
import ProductEmployeeCard from '../ProductEmployeeCard/ProductEmployeeCard';
import { getProductsFromServer } from '@/components/Admin_component/Products/ProductsManager/lib';

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProductsFromServer();
        let finalProducts = [];

        if (Array.isArray(response)) {
          finalProducts = response;
        } 
        else if (response && Array.isArray(response.data)) {
          finalProducts = response.data;
        } 
        else if (response && response.data && Array.isArray(response.data.data)) {
          finalProducts = response.data.data;
        }

        else if (response && typeof response === 'object') {
          const fallback = response.data || response;
          finalProducts = Array.isArray(fallback) ? fallback : Object.values(fallback || {});
        }

        setProducts(finalProducts);
      } catch (error) {
        console.error("خطأ أثناء جلب المنتجات في معرض الموظف:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8 space-y-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      {/*  Header */}
      <div className="text-right mb-10">
        <h1 className="text-4xl font-black text-[#0f172a]">المعرض الرئيسي</h1>
        <p className="text-slate-400 font-bold mt-2">اختر الصنف لمتابعة عملية البيع</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, idx) => (
            <div key={idx} className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 animate-pulse space-y-4">
              <div className="w-full h-40 bg-slate-100 rounded-[24px]"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3 mx-auto"></div>
              <div className="h-3 bg-slate-100 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="p-16 bg-white border border-dashed border-slate-200 rounded-[32px] text-center text-slate-400 font-bold text-sm">
          لا توجد منتجات متوفرة في المعرض حالياً.
        </div>
      ) : (
        <ProductEmployeeCard productsData={products} />
      )} 
    </div>
  );
};

export default ProductsManager;