import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Plus } from 'lucide-react';
import { products } from '../ProductsManager/lib';
import MyButton from '@/components/MyButton/MyButton';
import VariantCard from '../VariantCard/VariantCard';


const ProductVariantsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.product_id === parseInt(productId));

  if (!product) return <div className="p-20 text-center font-black">المنتج غير موجود</div>;

  return (
    <div className="p-8 space-y-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-slate-400 hover:text-black font-black">
        <ArrowRight size={20} /> العودة
      </button>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-[#0f172a]">{product.product_name}</h1>
          <p className="text-slate-400 font-bold tracking-widest mt-2 uppercase">Variants Dashboard</p>
        </div>
        <MyButton title="إضافة موديل" icon={<Plus size={20}/>} className="bg-[#0f172a] text-white px-6 py-4 rounded-2xl font-black shadow-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {product.variants_groups.map((group, idx) => (
          <VariantCard key={idx} group={group} />
        ))}
      </div>
    </div>
  );
};

export default ProductVariantsPage;