import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import InventoryStats from '../InventoryStats/InventoryStats';
import MyInput from '@/components/MyInput/MyInput';
import InventoryItemCard from '../InventoryItemCard/InventoryItemCard';
import { getInventoryAuditFromServer } from './lib';

function InventoryManager() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [searchQuery, setSearchQuery] = useState('');
  
  const [inventoryData, setInventoryData] = useState({
    statistics: { total_inventory_cost: 0, total_inventory_market: 0, potential_profit: 0 },
    items: []
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const res = await getInventoryAuditFromServer();
        if (res.success) {
          setInventoryData({
            statistics: res.statistics,
            items: res.items
          });
        }
      } catch (err) {
        setError(err.message || "حدث خطأ أثناء تحميل بيانات الجرد المالي.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const filteredItems  = inventoryData.items

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10" dir="rtl">
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-[#0f172a]">جرد المخزون التفصيلي</h1>
      </div>

      <InventoryStats stats={inventoryData.statistics} />

      {/* <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <MyInput 
            placeholder="بحث عن منتج أو موديل..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            Icon={<Search size={20} />} 
          />
        </div>
        <button className="h-14 bg-white px-8 rounded-[24px] border border-slate-100 flex items-center gap-2 font-black text-sm text-[#0f172a] hover:bg-slate-50 transition-colors">
          <Filter size={18} /> تصفية المنتجات
        </button>
      </div> */}

      {loading ? (
        <div className="py-20 text-center font-black text-slate-400 animate-pulse">جاري جرد المخزون وحساب الأصول الحالية...</div>
      ) : error ? (
        <div className="p-6 text-center bg-red-50 text-red-600 rounded-[24px] font-bold">{error}</div>
      ) : (
        <InventoryItemCard items={filteredItems} />
      )}
    </div>
  );
}

export default InventoryManager;