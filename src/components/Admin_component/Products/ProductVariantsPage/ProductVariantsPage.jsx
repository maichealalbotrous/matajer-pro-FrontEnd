import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Plus, Search } from 'lucide-react';
import { getVariantsserver } from './lib';
import MyButton from '@/components/MyButton/MyButton';
import VariantCard from '../VariantCard/VariantCard';
import Public_Alert from '@/components/public_Alert/Public_Alert';
import VariantFormDialog from '../VariantFormDialog/VariantFormDialog';
import MyInput from '@/components/MyInput/MyInput';

const ProductVariantsPage = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productName, setProductName] = useState("الموديلات المتاحة");
  
  // searchQuery
  const [searchQuery, setSearchQuery] = useState("");

  // Alert & Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [alertConfig, setAlertConfig] = useState({ isVisible: false, title: "", dis: "" });

 const loadVariants = async (searchVal = "") => {
  setLoading(true);
  setError(null); // إعادة تعيين الخطأ عند كل عملية بحث جديدة

  try {
    let data = [];

    if (searchVal.trim() !== "") {
      const filters = {
        product_id: Number(product_id),
        search: searchVal.trim(), // المسمى القياسي في لارافيل
        query: searchVal.trim()   // المسمى الاحتياطي لضمان المطابقة
      };
      
      data = await getVariantsserver(filters);
    } else {
      data = await getVariantsserver({});
    }
    
    setVariants(data);
    
    if (data.length > 0 && data[0].product) {
      setProductName(data[0].product);
    }
  } catch (err) {
    console.warn("تنبيه الفلترة من السيرفر:", err);
    
    setVariants([]); 
    
    setError(err.message || "لم يتم العثور على نتائج مطابقة لبحثك.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (product_id) {
        loadVariants(searchQuery);
      }
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, product_id]);


  const handleSaveSuccess = (title, dis) => {
    setAlertConfig({ isVisible: true, title, dis });
    loadVariants(searchQuery); 
    setTimeout(() => {
      setAlertConfig({ isVisible: false, title: "", dis: "" });
    }, 2500);
  };

  const openAddDialog = () => {
    setSelectedGroup(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (group) => {
    setSelectedGroup(group);
    setIsDialogOpen(true);
  };

  if (error) return <div className="p-20 text-center font-black text-red-500">{error}</div>;

  return (
    <div className="p-8 space-y-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      {/* Public_Alert */}
      <Public_Alert isVisible={alertConfig.isVisible} title={alertConfig.title} dis={alertConfig.dis} />

      {/* VariantFormDialog */}
      <VariantFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        productId={product_id}
        editGroup={selectedGroup}
        onSaveSuccess={handleSaveSuccess}
      />

      <button onClick={() => navigate('/products')} className="flex items-center gap-2 text-slate-400 hover:text-black font-black transition-all">
        <ArrowRight size={20} /> العودة إلى المنتجات
      </button>
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#0f172a]">{productName}</h1>
          <p className="text-slate-400 font-bold tracking-widest mt-2 uppercase">Variants Dashboard</p>
        </div>
        
        {/* قسم البحث والتحكم */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-72">
            <MyInput
              type="text"
              placeholder="ابحث عن المنتج..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-11 pl-4 py-3 bg-white text-[#0f172a] rounded-2xl border border-slate-100 font-bold text-sm shadow-sm focus:border-slate-200 focus:outline-none transition-all placeholder:text-slate-300"
            />
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                إلغاء
              </button>
            )}
          </div>

          <MyButton 
            title="إضافة موديل" 
            icon={<Plus size={20}/>} 
            onClick={openAddDialog}
            className="bg-[#0f172a] text-white px-6 py-3.5 rounded-2xl font-black shadow-lg hover:bg-slate-800 transition-all w-full sm:w-auto justify-center" 
          />
        </div>
      </div>

      {/* عرض مؤشر التحميل الفرعي أثناء الفلترة من السيرفر */}
     {/* استبدل الجزء السفلي الخاص بعرض الكروت بهذا الهيكل الموزون */}
      {loading ? (
        <div className="p-20 text-center font-black text-slate-500 animate-pulse">
          جاري جلب البيانات من السيرفر...
        </div>
      ) : error ? (
        // عرض رسالة السيرفر (مثل: "لاتوجد بيانات متوافقة مع البحث") بشكل احترافي دون حجب أزرار الصفحة
        <div className="p-16 text-center bg-white rounded-[35px] border border-dashed border-red-100 font-bold text-red-500">
          {error}
        </div>
      ) : variants.length === 0 ? (
        <div className="p-20 text-center bg-white rounded-[35px] border-2 border-dashed border-slate-100 font-bold text-slate-400">
          لا توجد موديلات أو مقاسات مضافة لهذا المنتج حتى الآن.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {variants.map((group, idx) => (
            <VariantCard 
              key={idx} 
              group={group} 
              onEdit={() => openEditDialog(group)}
              onRefresh={() => loadVariants(searchQuery)}
              onShowAlert={(title, dis) => {
                setAlertConfig({ isVisible: true, title, dis });
                setTimeout(() => setAlertConfig({ isVisible: false, title: "", dis: "" }), 2500);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductVariantsPage;