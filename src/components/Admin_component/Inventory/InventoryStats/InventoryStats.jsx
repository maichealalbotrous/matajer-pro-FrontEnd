import React from 'react';
import { Package, BadgeDollarSign, Landmark } from 'lucide-react';

function InventoryStats({ stats }) {
  const cards = [
    { label: "قيمة التكلفة", value: stats?.total_inventory_cost, icon: <Landmark />, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "القيمة السوقية", value: stats?.total_inventory_market, icon: <BadgeDollarSign />, color: "text-green-600", bg: "bg-green-50" },
    { label: "الربح المتوقع", value: stats?.potential_profit, icon: <Package />, color: "text-blue-600", bg: "bg-blue-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center`}>
            {card.icon}
          </div>
          <div>
            <p className="text-slate-400 font-bold text-[10px] mb-1">{card.label}</p>
            <h3 className="text-xl font-black text-[#0f172a] tabular-nums">
              {card.value?.toLocaleString()} <span className="text-[10px]">ل.س</span>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InventoryStats;