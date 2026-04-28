import React from 'react';
import { ChevronLeft, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductEmployeeCard = ({ productsData }) => {
  const navigate = useNavigate();

  if (!productsData || productsData.length === 0) {
    return (
      <div className="col-span-full py-20 text-center bg-white rounded-[35px] border-2 border-dashed border-slate-100">
        <Package size={48} className="mx-auto text-slate-200 mb-4" />
        <p className="text-slate-400 font-bold">لا توجد منتجات متوفرة حالياً</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6" dir="rtl">
      {productsData.map((product) => (
        <div 
          key={product.product_id}
          onClick={() => navigate(`/EmployeeProducts/${product.product_id}/variants`)}
          className="group bg-white border border-slate-100 rounded-[35px] p-4 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="aspect-square rounded-[25px] bg-slate-50 mb-4 overflow-hidden relative">
            {product.image ? (
              <img 
                src={product.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt={product.product_name} 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                <Package size={48} />
              </div>
            )}
          </div>

          <div className="px-2 pb-2 text-right">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-black text-xl text-[#0f172a] truncate ml-2">
                {product.product_name}
              </h3>
              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#0f172a] group-hover:text-white transition-all">
                <ChevronLeft size={18} />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold text-sm">
                {product.variants_groups?.length || 0} موديلات متاحة
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductEmployeeCard;