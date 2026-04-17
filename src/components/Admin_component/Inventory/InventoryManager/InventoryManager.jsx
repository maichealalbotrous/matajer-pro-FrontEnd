import React from 'react';

import { Search, Filter } from 'lucide-react';
import InventoryStats from '../InventoryStats/InventoryStats';
import MyInput from '@/components/MyInput/MyInput';
import InventoryItemCard from '../InventoryItemCard/InventoryItemCard';

 const testinventoryData = {
    statistics: {
      total_inventory_cost: 280,
      total_inventory_market: 14500,
      potential_profit: 14220
    },
    items: [
      {
        product_name: "hodeis",
        variant_name: "Hodei one",
        color: "kh",
        total_group_qty: 28,
        total_group_cost: 280,
        sizes_details: [
          { size: "m", quantity: 8 },
          { size: "xL", quantity: 5 },
          { size: "m", quantity: 10 },
          { size: "xL", quantity: 5 }
        ]
      },
      {
           product_name: "hodeis",
        variant_name: "Hodei two",
        color: "red",
        total_group_qty: 16,
        total_group_cost: 300,
        sizes_details: [
          { size: "m", quantity: 8 },
          { size: "xL", quantity: 5 },
          { size: "m", quantity: 10 },
          { size: "xL", quantity: 5 }
        ]
      }
    ]
  };

function InventoryManager({ inventoryData = testinventoryData }) {

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-[#0f172a]">جرد المخزون التفصيلي</h1>
      </div>

      <InventoryStats stats={inventoryData.statistics} />

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <MyInput 
            placeholder="بحث عن منتج..." 
            Icon={<Search size={20} />} 
          />
        </div>
        <button className="h-14 bg-white px-8 rounded-[24px] border border-slate-100 flex items-center gap-2 font-black text-sm text-[#0f172a]">
          <Filter size={18} /> تصفية المنتجات
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InventoryItemCard items={inventoryData.items} />
      </div>
    </div>
  );
}

export default InventoryManager;