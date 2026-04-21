import React from 'react';
import { ChevronLeft, Package } from 'lucide-react';

const ProductCard = ({ product, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-white border border-slate-100 rounded-[35px] p-4 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer relative overflow-hidden"
  >
    <div className="aspect-square rounded-[25px] bg-slate-50 mb-4 overflow-hidden relative">
      {product.image ? (
        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.product_name} />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-300"><Package size={48} /></div>
      )}
    </div>
    <div className="px-2 pb-2">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-black text-xl text-[#0f172a]">{product.product_name}</h3>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#0f172a] group-hover:text-white transition-all">
          <ChevronLeft size={18} />
        </div>
      </div>
      <p className="text-slate-400 font-bold text-sm">{product.variants_groups?.length || 0} موديلات</p>
    </div>
  </div>
);

export default ProductCard;